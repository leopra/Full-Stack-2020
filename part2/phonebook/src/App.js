import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', tel: '040-123456' },
		{ name: 'Ada Lovelace', tel: '39-44-5323523' },
		{ name: 'Dan Abramov', tel: '12-43-234345' },
		{ name: 'Mary Poppendieck', tel: '39-23-6423122' }
	])
	const [newName, setNewName] = useState('')
	const [newPhone, setNewPhone] = useState('')
	const [search, setSearch] = useState('')


	const addContact = (event) => {
		event.preventDefault()
		const contact = { name: newName, tel: newPhone }

		const found = persons.some(el => el.name === newName)
		if (found === true) {
			window.alert(`${newName} is already added to phonebook`)
			setNewName('')
			setNewPhone('')
			return
		}
		console.log('tel added', contact)
		setPersons(persons.concat(contact))
		setNewName('')
		setNewPhone('')
	}


	const handleNameChange = (event) => {
		setNewName(event.target.value)

	}

	const handleTelChange = (event) => {
		setNewPhone(event.target.value)

	}

	const handleSearchChange = (event) => {
		setSearch(event.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={search} onChange={handleSearchChange} />
			<h2>Add a New</h2>
			<PersonForm newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handleTelChange={handleTelChange} addContact={addContact}></PersonForm>
			<h2>Numbers</h2>
			<Persons persons={persons} search={search} ></Persons>
		</div>
	)
}

export default App