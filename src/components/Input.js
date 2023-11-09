import React from 'react';

const Input = ({ label, children }) => {
	return (
		<>
			<p className="mb-1 fw-bolder">{label}</p>
			{children}
		</>
	);
};

export default Input;
