import React, { useEffect, useState } from 'react'
import personService from './services/persons'

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
    <div>{prop.person.name} {prop.person.number} <button onClick={() => prop.handleDelete(prop.person)}>Delete</button> </div>
  )
}

const Notification = ({ message }) => {
  if (message === null || message === undefined) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setNewFilterValue ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState(persons)
  const [ notificationMessage, setNotificationMessage ] = useState()

  useEffect(() => {
    personService.getAll()
    .then(persons => {
      setPersons(persons);
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

  const handleDelete = (person) => {
    const result = window.confirm(`Delete ${person.name}?`);
    if (result) {
      personService.deletePerson(person.id)
      .then(response => {
        personService.getAll()
        .then(persons => {
          setPersons(persons);
        });
        setNotificationMessage(`Deleted ${person.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        setNotificationMessage(`Information of ${person.name} has already been removed from the server`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson !== undefined) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (result) {
        personService.updatePerson({...existingPerson, number: newNumber})
        .then(changedPerson => {
          setPersons(persons.filter(person => person.id !== existingPerson.id).concat(changedPerson))
          setNotificationMessage(`Updated ${newName}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService.addPerson(newPerson)
      .then(person => {
        setPersons(persons.concat(person))
        setNotificationMessage(`Added ${newName}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />

      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange} handleSubmit={handleSubmit}/>

      <h3>Numbers</h3>

      {filteredPersons.map(person => <Person key={person.name} person={person} handleDelete={handleDelete}></Person>)}
    </div>
  )
}

export default App