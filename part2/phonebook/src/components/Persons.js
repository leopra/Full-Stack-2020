import React from 'react'

const Contact = ({ props, deleteContact }) => {
    const confirmDelete = (id,name) => {
        if(window.confirm(`Delete ${name}?`)) {
            deleteContact(id);
          }
          return;
    }

    const phone = props.number || 0
    return (<li>{props.name} {phone} <button onClick={() => confirmDelete(props.id, props.name)}>delete</button></li>)
}

const Persons = ({ persons, search, deleteContact }) => {
    console.log(search)
    return (<ul>
        {persons.filter((pers) => {
            return (pers.name.toLowerCase().includes(search.toLowerCase()))
        }).map((pers) => <Contact key={pers.name} props={pers} deleteContact={deleteContact}></Contact>)}</ul>)
}
export default Persons
