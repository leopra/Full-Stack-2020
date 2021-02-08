import React, { useState, useEffect } from 'react';
import axios from 'axios'

const CountryInfo = props => {
	const [show, setShow] = useState(false);

	if (show) {
		return <div>
			<h2>{props.country.name}</h2>
			<p>capital {props.country.capital}</p>
			<p>population {props.country.population}</p>
			<h3>Languages</h3>
			<ul>
				{props.country.languages && props.country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
			</ul>
			<img src={props.country.flag} height="150" />
		</div>
	}

	else {
		return (
			<p key={props.country.name}>
				{props.country.name}
				<button onClick={() => setShow(!show)}>show</button>
			</p>)
	}
}


const CountriesList = ({ list, search }) => {
	const data = list.filter(country =>
		country.name
			.toLowerCase()
			.includes(search.toLowerCase())
	);
	console.log(data)

	if (data.length > 10) {
		return <p>Too many matches, specify another filter</p>
	}

	return (
		<>
			{data.map(country => <CountryInfo key={country.name} show={false} country={country} />)}
		</>
	);
}

export default CountriesList