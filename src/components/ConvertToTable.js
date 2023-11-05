import React from 'react';
import { Table } from 'react-bootstrap';

const ConvertToTable = ({ df }) => {
	const columns = Object.keys(df);

	// Tạo một đối tượng chứa các giá trị thông số
	const stats = {
		count: 2,
		max: 538184,
		mean: 522876,
		min: 507568,
		std: 21648.78121280734,
		'25%': 515222,
		'50%': 522876,
		'75%': 530530,
	};

	return (
		<Table striped bordered hover responsive size="sm">
			<thead>
				<tr>
					<th></th>
					{columns.map((col, index) => (
						<th key={index}>{col}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{Object.keys(stats).map((stat, index) => (
					<tr key={index}>
						<td>{stat}</td>
						{columns.map((col) => (
							<td key={col}>{df[col][stat]}</td>
						))}
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default ConvertToTable;
