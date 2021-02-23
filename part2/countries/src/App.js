import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CountryFilter = (prop) => {
  return (
    <div>
      Find countries <input value={prop.countryName} onChange={prop.handleFilterChange}></input>
    </div>
  )
}

const CountriesList = ({ countries, setCountryToShow }) => {
  
  const handleOnClick = (country) => {
    console.log(country);
    setCountryToShow(country)
  }

  if (countries.length >=10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (countries.length > 1) {
    return (
      countries.map(country => {
        return (
        <>
          <div key={country.name}>
            {country.name} <button key={country.name} onClick={() => handleOnClick(country)}>show</button>
          </div>
        </>)
      })
    )
  }
  return null
}

const CountryDetail = (prop) => {
  if (prop.country === undefined) {
    return null
  } else {
    return (
      <>
        <h2>{prop.country.name}</h2>
        <div>Capital {prop.country.capital}</div>
        <div>Population {prop.country.population}</div>
        
        <h3>languages</h3>
        <ul>
          {prop.country.languages.map(language => 
            <li key={language.iso639_1}>{language.name}</li>
          )}
        </ul>
        <img src={prop.country.flag} width={100} height={100}></img>
      </>
    ) 
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countryToShow, setCountryToShow] = useState()

  const handleFilterChange = (event) => {
    const filteredCountries = countries.filter(country => 
      country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredCountries(filteredCountries)
    if (filteredCountries.length === 1) {
      setCountryToShow(filteredCountries[0])
    } else {
      setCountryToShow()
    }
  }

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data);
    });
  }, [])

  return (
    <>
      <CountryFilter handleFilterChange={handleFilterChange}></CountryFilter>
      <CountriesList countries={filteredCountries} setCountryToShow={setCountryToShow}></CountriesList>
      <CountryDetail country={countryToShow}></CountryDetail>
    </>
  );
}

export default App;
