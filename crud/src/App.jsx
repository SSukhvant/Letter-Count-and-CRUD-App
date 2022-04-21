import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from 'axios';

let user = [];

function App() {
  const [random, setRandom] = useState('');
  const RandomNum = (min, max) => {
   return setRandom(Math.floor(Math.random() * (max)) + min);
  }

  const AddRecord = (random) => {
    Axios.get(`https://swapi.dev/api/people/${random}`).then((response) => {
      console.log(response.data.name);
      user.push({id: random, name: response.data.name});
    });
    console.log(user);
  }

  const DeleteRecord = (id) => {
    user.splice(user.findIndex(a => a.id === id),1);
  }

  useEffect(() => {
    if(random==''){
      console.log('Add Record');
      RandomNum(1,10);
    } else {
      AddRecord(random);
    }
    },[random]);

  return (
    <div className="app">
      <button type="button" className="app__add-btn" onClick={() => {RandomNum(1,10)}}>Add record</button>
      <div className="app__container">
        <table>
        <thead>
        <tr>
        <th>Name</th>
        <th>{random}</th>
      </tr>
        </thead>
        <tbody>
        {user.map((index, key) => {
          return (
          <tr key={key}>
          <td>{index.name}</td>
          <td><button type="button" className="app__delete-btn" onClick={() => DeleteRecord(index.id)}>Delete</button></td>
          </tr>
        )
        })}
        </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

// {people.map((index, key) => {
//   <tr key={key}>
//   <td>{index.name}</td>
//   <td><button type="button" className="app__delete-btn">Delete</button></td>
//   </tr>
// })}
