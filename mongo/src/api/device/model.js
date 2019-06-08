import mongoose, { Schema } from 'mongoose'

const deviceSchema = new Schema(
  {
    dId: {
      type: Number
    },
    action: {
      type: String
    },
    name: {
      type: String
    },
    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Connection'
      }
    ]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id
      }
    }
  }
)

deviceSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      dId: this.dId,
      action: this.action,
      name: this.name,
      connections: this.connections,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full
      ? {
        ...view
        // add properties for a full view
      }
      : view
  }
}

const model = mongoose.model('Device', deviceSchema)

export const schema = model.schema
export default model
