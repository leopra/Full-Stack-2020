import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addTelephone = (event) => {
		event.preventDefault()
		const contact = {name: newName}
  	console.log('tel added', contact)
    setPersons(persons.concat(contact))
		setNewName('')

  }
  
  const Contact = ({props}) => {
      console.log(props)
      const phone = props.phone || 0
      return (<li>{props.name} {phone}</li>)
  }

  const handleTelChange = (event) => {
      setNewName(event.target.value)

  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addTelephone}>
        <div>
          name: <input onChange={handleTelChange} onSubmit={addTelephone}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{persons.map((pers)=><Contact key={pers.name} props={pers}></Contact>)}</ul>
      <div>debug: {newName}</div>

    </div>
  )
}

export default App