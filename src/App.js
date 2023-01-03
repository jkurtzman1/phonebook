import axios from 'axios';
import {useEffect, useState} from 'react'

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

const Person = ({person}) =>
{
  return(
    <li>{person.name}: {person.number}</li>
  );
}

const PeopleList = ({people, filterName}) =>
{
  const filterNameLowercase = filterName.toLowerCase();
  const toShow = people.filter(p => p.name.toLowerCase().includes(filterNameLowercase))
                        .map(p => <Person key={p.name} person={p}/>);
  return(toShow);
}

const App = () =>
{
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(()=>{
    axios.get("http://localhost:3001/persons")
    .then(response => setPeople(response.data))
  }, []);
  
  const addPerson = (event) =>
  {
    event.preventDefault();
    const newPerson = {name: newName, number: newNumber};
    for(let i = 0; i < people.length; i++)
    {
      if(people[i].name === newPerson.name)
      {
        alert(`${newPerson.name} is already in the phonebook!`);
        return;
      }
    }
    setPeople(people.concat(newPerson))
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
    //console.log(people.filter(person => person.name.includes(filterName)));
    //toShow = people.filter(person => person.name.includes(filterName));
    //toShow = toShow.map(p => <li key={p.name}>{p.name}: {p.number}</li>)
    //console.log(toShow);
    //.map(person => <li key={person.name}>{person.name}: {person.number}</li>)

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
        <PeopleList people={people} filterName={filterName} />
      </ul>
    </div>
  );
}

export default App;