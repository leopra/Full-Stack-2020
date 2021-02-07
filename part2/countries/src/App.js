import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({countries}) => {
	if (countries.length < 10 && countries.length > 1) {
		return (<ul>{countries.map((c) => <li>{c.name}</li>)}</ul>)
	}
	if (countries.length === 1) {
		const cntry = countries[0];
		return (
			<div>
				<h2>{cntry.name}</h2>
				<div>Capital {cntry.capital}</div>
				<div>Population {cntry.population}</div>
				<h3>Languages</h3>
				<div>{cntry.languages.map((lang) => <li key={lang.name}>{lang.name}</li>)}</div>
				<div>
					<img src={cntry.flag} style={{ width: '100px' }}/>
				</div>
			</div>
		);
	}
	else return ('Too Many Matches, specify another filter')
}

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

	const results = countries.filter((country) => country.name.toLowerCase().includes(search.toLowerCase()));

	return (
		<div>
			<div>find countries <input value={search} onChange={handleSearchChange} /></div>
			<Countries countries={results}></Countries>
		</div>

	)
}

export default App