import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesList from './components/CountriesList';

const App = () => {
	const [countries, setCountries] = useState([])
	const [search, setSearch] = useState('')


	const hook = () => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				console.log('promise fulfilled')
				setCountries(response.data)
			})
	}

	useEffect(hook, [])

	const handleSearchChange = (event) => {
		setSearch(event.target.value)
	}

	return (
		<div>
			<div>find countries <input value={search} onChange={handleSearchChange} /></div>
			<CountriesList list={countries} search={search}/>
		</div>

	)
}

export default App