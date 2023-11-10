import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';

import AlterCus from './AlterCus';

const ConfirmDialog = ({ children, show, onClose, onConfirm }) => {
	return (
		<AlterCus show={show}>
			<Container>{children}</Container>
			<Container className="mt-2 text-end">
				<Button variant="success" onClick={onConfirm} className="mx-2">
					Xác nhận
				</Button>
				<Button variant="danger" onClick={onClose}>
					Hủy
				</Button>
			</Container>
		</AlterCus>
	);
};

export default ConfirmDialog;
