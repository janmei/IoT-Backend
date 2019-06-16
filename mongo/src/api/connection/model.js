import mongoose, { Schema } from 'mongoose'

const connectionSchema = new Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device'
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device'
    },
    payload: {
      type: String
    }
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

connectionSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      from: this.from,
      to: this.to,
      payload: this.payload,
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

const model = mongoose.model('Connection', connectionSchema)

export const schema = model.schema
export default model
