import React from 'react'


const Contact = ({ props }) => {
    const phone = props.number || 0
    return (<li>{props.name} {phone}</li>)
}

const Persons = ({ persons, search }) => {
    console.log(search)
    return (<ul>
        {persons.filter((pers) => {
            return (pers.name.toLowerCase().includes(search.toLowerCase()))
        }).map((pers) => <Contact key={pers.name} props={pers}></Contact>)}
    </ul>)
}
export default Persons
