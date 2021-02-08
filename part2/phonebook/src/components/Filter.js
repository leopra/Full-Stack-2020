import React from 'react';

const Filter = ({ search, onChange }) => {
	return (
		<div>
            <div>filter shown with <input value={search} onChange={onChange} /></div>

		</div>
	);
};

export default Filter