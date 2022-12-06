import {useState} from 'react'

const App = () =>
{
  const [people, setPeople] = useState([{name: "Arto Hellas", number: '222-222-2222'}]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  //No need to filter anything with emptry string, which is default
  const filterNameLowercase = filterName.toLowerCase();
  console.log(filterNameLowercase);
  const toShow = people.filter(p => p.name.toLowerCase().includes(filterNameLowercase)).map(p => <li key={p.name}>{p.name}: {p.number}</li>);
  
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
      <div>
        <p>Filter By Name: <input value={filterName} onChange={handleFilterChange} /></p>
      </div>
      <h2>Add a New Person</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {toShow}
      </ul>
    </div>
  );
}

export default App;