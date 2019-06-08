import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactNodeGraph from 'react-node-graph';

function App() {
	var exampleGraph = {
		nodes: [
			{
				nid: 0,
				type: 'Timer',
				x: 89,
				y: 82,
				fields: {
					in: [{ name: 'reset' }, { name: 'pause' }, { name: 'max' }],
					out: [{ name: 'out' }]
				}
			},
			{
				nid: 1,
				type: 'MathMult',
				x: 284,
				y: 82,
				fields: {
					in: [{ name: 'in' }, { name: 'factor' }],
					out: [{ name: 'out' }]
				}
			},
			{
				nid: 2,
				type: 'Vector3',
				x: 486,
				y: 188,
				fields: {
					in: [{ name: 'xyz' }, { name: 'x' }, { name: 'y' }, { name: 'z' }],
					out: [{ name: 'xyz' }, { name: 'x' }, { name: 'y' }, { name: 'z' }]
				}
			}
		],
		connections: [
			{ from_node: 1, from: 'field_name', to_node: 2, to: 'field_name' }
		]
	};
	return (
		<div className="App">
			<ReactNodeGraph
				data={exampleGraph}
				onNodeMove={(nid, pos) => this.onNodeMove(nid, pos)}
				onNodeStartMove={nid => this.onNodeStartMove(nid)}
				onNewConnector={(n1, o, n2, i) => this.onNewConnector(n1, o, n2, i)}
				onRemoveConnector={connector => this.onRemoveConnector(connector)}
			/>
		</div>
	);
}

export default App;
