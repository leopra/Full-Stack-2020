import React from 'react';

const Filter = ({ search, onChange }) => {
	return (
		<div>
			<h2>Phonebook</h2>

            <div>filter shown with <input value={search} onChange={onChange} /></div>

		</div>
	);
};

export default Filter