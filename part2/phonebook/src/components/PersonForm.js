import React from 'react';

const PersonForm = ({newName,newPhone,handleNameChange,handleTelChange,addContact}) => {
return (<form onSubmit={addContact}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>number: <input value={newPhone} onChange={handleTelChange} /></div>

				<div>
					<button type="submit">add</button>
				</div>
			</form>)
}

export default PersonForm