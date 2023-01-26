import {useEffect, useState} from 'react'
import pService from "./services/personService"

const PersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, addPerson}) =>
{
  return(
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  );
}

const Filter = ({filterName, handleFilterChange}) =>
{
  return(
    <div>
      <p>Filter By Name: <input value={filterName} onChange={handleFilterChange} /></p>
    </div>
  );
}

const Person = ({person, deleteFunction}) =>
{
  return(
    <li>{person.name}: {person.number} <button onClick={() => deleteFunction(person.id)}>Delete</button></li>
  );
}

const PeopleList = ({people, filterName, deleteFunction}) =>
{
  const filterNameLowercase = filterName.toLowerCase();
  const toShow = people.filter(p => p.name.toLowerCase().includes(filterNameLowercase))
                        .map(p => <Person key={p.name} person={p} deleteFunction={deleteFunction}/>);
  return(toShow);
}

const App = () =>
{
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {pService.getPhonebook().then(phoneBook => setPeople(phoneBook))}, []);
  
  const addPerson = (event) =>
  {
    event.preventDefault();
    const newPerson = {name: newName, number: newNumber};
    for(let i = 0; i < people.length; i++)
    {
      if(people[i].name === newPerson.name)
      {
        if(people[i].number === newPerson.number)
        {
          alert(`${newPerson.name} is already in the phonebook!`);
          return;
        }else if(people[i].number !== newPerson.number)
        {
          if(window.confirm(`${people[i].name} is already in the phonebook. Change the number?`))
          {
            pService.updatePerson(people[i].id, newPerson)
                  .then(res => setPeople(people.map(p => people[i].id !== p.id ? p : res)));
          }
          setNewName('');
          setNewNumber('');
          return;
        }
      }
    }

    pService.addPersonToDB(newPerson).then(setPeople(people.concat(newPerson)));
    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (event) =>
  {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) =>
  {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) =>
  {
    setFilterName(event.target.value);
  }

  const deletePerson = (id) =>
  {
    console.log(`Delete person id: ${id}`);
    pService.deletePersonFromDB(id).then(setPeople(people.filter(p => p.id !== id)));
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
      <h2>Add a New Person</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange}
          newNumber={newNumber} handleNumberChange={handleNumberChange}
          addPerson={addPerson}/>
      <h2>Numbers</h2>
      <ul>
        <PeopleList people={people} filterName={filterName} deleteFunction = {deletePerson}/>
      </ul>
    </div>
  );
}

export default App;