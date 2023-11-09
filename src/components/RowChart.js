import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ConvertToTable from './ConvertToTable';

const RowChart = ({ title, chart, describe }) => {
	const [showDes, setShowDes] = useState(false);

	return (
		<Container className="my-5">
			<Row className="justify-content-center mb-2">
				<p className="text-center h5">{title}</p>
			</Row>
			<Row className="justify-content-center align-items-center">
				<Col md={showDes ? 8 : 12}>{chart}</Col>
				{showDes && (
					<Col md={4}>
						<ConvertToTable df={describe} />
					</Col>
				)}
			</Row>
			<Row className="justify-content-center">
				<Col md={2}>
					<Button onClick={() => setShowDes(!showDes)}>
						{showDes ? 'Ẩn' : 'Hiện'} bảng thông kê
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default RowChart;
