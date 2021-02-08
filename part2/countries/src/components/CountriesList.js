import React, { useState, useEffect } from 'react';
import axios from 'axios'
const CountryInfo = props => {
	const [show, setShow] = useState(false);
	const [weather, setWeather] = useState({})

	const hook = () => {
		const api_key = process.env.REACT_APP_API_KEY
		axios
			.get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + props.country.name)
			.then(response => {
				console.log('promise fulfilled')
				setWeather(response.data)
			})
	}

	useEffect(hook, [])

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
			<h3>Weather in {props.country.name}</h3>
			<p>temperature: {weather.current.temperature} Celsius</p>
			<img src={weather.current.weather_icons} height="150" alt='weather image' />
			<h3>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</h3>





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