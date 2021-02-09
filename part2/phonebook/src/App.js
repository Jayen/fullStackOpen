import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = (prop) => {
  return (
  <div>
    filter shown with: <input value={prop.filterValue} onChange={prop.handleFilterChange}/>
  </div>)
}

const PersonForm = (prop) => {
  return (
  <form onSubmit={prop.handleSubmit}>
    <div>
      name: <input value={prop.newName} onChange={prop.handleNameChange}/>
    </div>
    <div>
      number: <input value={prop.newNumber} onChange={prop.handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>)
}

const Person = (prop) => {
  return (
    <div>{prop.person.name} {prop.person.number}</div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setNewFilterValue ] = useState('')
  const [ filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data);
    });
  }, []);

  useEffect(() => {
    if (filterValue !== '') {
      setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase())))
    } else {
      setFilteredPersons(Array.from(persons))
    }
  }, [persons, filterValue])

  const handleFilterChange = (event) => {
    setNewFilterValue(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))    
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange} handleSubmit={handleSubmit}/>

      <h3>Numbers</h3>

      {filteredPersons.map(person => <Person key={person.name} person={person}></Person>)}
    </div>
  )
}

export default App