import React from 'react';
import { Nav, OverlayTrigger, Tab, Tooltip } from 'react-bootstrap';
import { SiFuturelearn } from 'react-icons/si';
import { MdCompare } from 'react-icons/md';
import styled from 'styled-components';

import DataVisual from '../components/compare/DataVisual';
import Compare from '../components/compare/Compare';

const AsideStyled = styled.div`
	background-color: #fff;
	padding: 0;
	width: 3rem;
	top: 16rem;
	position: fixed;
	top: 4rem;
	left: 0;
	box-shadow: 0 4px 0.5rem rgba(0, 0, 0, 0.1);
`;

const DataVisualization = () => {
	return (
		<Tab.Container defaultActiveKey="compare">
			<AsideStyled>
				<Nav
					variant="pills"
					className="flex-column position-sticky sticky-top"
					onSelect={null}
				>
					<Nav.Item>
						<OverlayTrigger
							placement="right"
							overlay={<Tooltip>Dự đoán</Tooltip>}
						>
							<Nav.Link eventKey={'visual'} className="rounded-0">
								<SiFuturelearn />
							</Nav.Link>
						</OverlayTrigger>
					</Nav.Item>
					<Nav.Item>
						<OverlayTrigger
							placement="right"
							overlay={<Tooltip>So sánh</Tooltip>}
						>
							<Nav.Link
								eventKey={'compare'}
								className="rounded-0"
							>
								<MdCompare />
							</Nav.Link>
						</OverlayTrigger>
					</Nav.Item>
				</Nav>
			</AsideStyled>
			<Tab.Content>
				<Tab.Pane eventKey="visual">
					<DataVisual />
				</Tab.Pane>
				<Tab.Pane eventKey="compare">
					<Compare />
				</Tab.Pane>
			</Tab.Content>
		</Tab.Container>
	);
};

export default DataVisualization;
