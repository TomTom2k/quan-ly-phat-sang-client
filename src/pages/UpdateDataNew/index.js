import React from 'react';

import styled from 'styled-components';
import { Row, Col, Container } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UpdateDataDevice from './UpdateDataDevice';
import UpdateDataConsume from './UpdateDataConsume';

const WrapperStyled = styled.div`
	height: calc(100vh - 100px);
	position: relative;
`;

const UpdateDataNew = () => {
	return (
		<WrapperStyled>
			<Container>
				<Row>
					<Col lg={12}>
						<Tabs
							defaultActiveKey="device"
							id="justify-tab-example"
							className="mb-3"
							justify
						>
							<Tab eventKey="device" title="Dữ liệu thiết bị">
								<UpdateDataDevice />
							</Tab>
							<Tab
								eventKey="electricity"
								title="Dữ liệu tiêu thụ"
							>
								<UpdateDataConsume />
							</Tab>
						</Tabs>
					</Col>
				</Row>
			</Container>
		</WrapperStyled>
	);
};

export default UpdateDataNew;
