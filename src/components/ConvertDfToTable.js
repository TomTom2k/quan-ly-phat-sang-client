import React from 'react';
import { Table } from 'react-bootstrap';

const ConvertDfToTable = (data) => {
	const cols = Object.keys(data);
	return (
		<Table striped bordered hover size="sm" responsive>
			<thead>
				<tr>
					{cols.map((col, index) => (
						<th key={index}>{col}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{Array.from({ length: data[cols[0]].length }).map(
					(_, rowIndex) => (
						<tr key={rowIndex}>
							{cols.map((col, colIndex) => (
								<td key={colIndex}>{data[col][rowIndex]}</td>
							))}
						</tr>
					)
				)}
			</tbody>
		</Table>
	);
};

export default ConvertDfToTable;
