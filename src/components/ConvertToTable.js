import React from 'react';
import { Table } from 'react-bootstrap';

const ConvertToTable = ({ df, calculationType }) => {
	// Tạo một đối tượng chứa các giá trị thông số
	const functions = ['sum', 'mean', 'std', 'min', '25%', '50%', '75%', 'max'];
	const calculationTypeTitle = {
		tongGiaTri: 'Giá Trị',
		tongThanhTien: 'Thành Tiền',
	};

	return (
		<>
			{df?.length && (
				<Table
					striped
					bordered
					hover
					responsive
					size="sm"
					className="user-select-none"
				>
					<thead>
						{calculationType ? (
							<tr>
								<th></th>
								<th>{calculationTypeTitle[calculationType]}</th>
							</tr>
						) : (
							<tr>
								<th></th>
								<th>Giá Trị</th>
								<th>Thành Tiền</th>
							</tr>
						)}
					</thead>
					<tbody>
						{functions.map((func, index) =>
							calculationType ? (
								<tr key={index}>
									<td>{func}</td>
									<td>{df[index][0]}</td>
								</tr>
							) : (
								<tr key={index}>
									<td>{func}</td>
									<td>{df[index][0]}</td>
									<td>{df[index][1]}</td>
								</tr>
							)
						)}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default ConvertToTable;
