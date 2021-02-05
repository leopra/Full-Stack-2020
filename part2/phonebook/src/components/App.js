import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
	const [ newPhone, setNewPhone ] = useState('')


  const addContact = (event) => {
		event.preventDefault()
		const contact = {name: newName, tel: newPhone}

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
  
  const Contact = ({props}) => {
      const phone = props.tel || 0
      return (<li>{props.name} {phone}</li>)
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)

  }

	const handleTelChange = (event) => {
		setNewPhone(event.target.value)

}
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
				<div>number: <input value={newPhone} onChange={handleTelChange}/></div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{persons.map((pers)=><Contact key={pers.name} props={pers}></Contact>)}</ul>
    </div>
  )
}

export default App