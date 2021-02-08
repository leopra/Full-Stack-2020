import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personServ from './services/persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newPhone, setNewPhone] = useState('')
	const [search, setSearch] = useState('')


	const hook = () => {
		personServ.getAll()
			.then(response => {
				console.log('promise fulfilled')
				setPersons(response)
			})
	}

	useEffect(hook, [])

	const addContact = (event) => {
		event.preventDefault()
		const contact = { name: newName, number: newPhone }

		const found = persons.some(el => el.name === newName)
		if (found === true) {
			const oldContact = persons.find(o => o.name === newName)
			window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
			personServ.update(oldContact.id, { ...oldContact, number: newPhone }).then(updated => {
				let notchangedpersons = persons.filter(p => p.id != updated.id);
				let updatedState = [...notchangedpersons, updated]
				setPersons(updatedState)
				setNewName('')
				setNewPhone('')
				return
			})
		}
		else {
			console.log('tel added', contact)
			setPersons(persons.concat(contact))
			personServ.create(contact).catch(error => {
				console.log(error);
			})
			setNewName('')
			setNewPhone('')
		}
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

	const deleteContact = id => {
		personServ
			.remove(id)
			.then(() => {
				const updatedPersons = persons.filter(p => p.id !== id);
				setPersons(updatedPersons);
			})
	}



	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={search} onChange={handleSearchChange} />
			<h2>Add a New</h2>
			<PersonForm newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handleTelChange={handleTelChange} addContact={addContact}></PersonForm>
			<h2>Numbers</h2>
			<Persons persons={persons} search={search} deleteContact={deleteContact}></Persons>
		</div>
	)
}

export default App