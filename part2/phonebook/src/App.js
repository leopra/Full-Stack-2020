import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personServ from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'


const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newPhone, setNewPhone] = useState('')
	const [search, setSearch] = useState('')
	const [notification, setNotification] = useState('')
	const [error, setError] = useState('')



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
			personServ.update(oldContact.id, { name: oldContact.name, number: newPhone }).then(updated => {
				console.log('updated', updated)
				let notchangedpersons = persons.filter(p => p.id != updated.id);
				let updatedState = [...notchangedpersons, updated]
				setPersons(updatedState)
				setNewName('')
				setNewPhone('')
				setNotification('Operation completed')
				setTimeout(() => {
					setNotification(null)
				}, 5000)
			}).catch(error => {
				setError(error.response.data.error)

				setTimeout(() => {
					setError(null)
				}, 5000)
			})
		}
		else {
			personServ.create(contact).then((res) => {
				setNotification('Operation completed', contact)
				setPersons(persons.concat(res))
				setTimeout(() => {
					setNotification(null)
				}, 5000)
			}).catch(error => {
				setError(error.response.data.error)
				setTimeout(() => {
					setError(null)
				}, 5000)
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
			}).catch(() => {
				setError('error deleting user')
				setTimeout(() => {
					setError(null)
				}, 5000)
			})
	}



	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={notification} />
			<Error message={error} />
			<Filter value={search} onChange={handleSearchChange} />
			<h2>Add a New</h2>
			<PersonForm newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handleTelChange={handleTelChange} addContact={addContact}></PersonForm>
			<h2>Numbers</h2>
			<Persons persons={persons} search={search} deleteContact={deleteContact}></Persons>
		</div>
	)
}

export default App