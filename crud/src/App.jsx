import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";

const getLocalData = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

function App() {
  const [random, setRandom] = useState("");
  const [items, setItems] = useState(getLocalData());

  const AddRecord = (random) => {
    Axios.get(`https://swapi.dev/api/people/${random}`).then((response) => {
      const allData = {
        id: new Date().getTime().toString(),
        name: response.data.name,
      };
      setItems([...items, allData]);
    });
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  const DeleteRecord = (index) => {
    const updatedLists = items.filter((people) => {
      return index !== people.id;
    });
    setItems(updatedLists);
  };

  const RandomNum = (min, max) => {
    return setRandom(Math.floor(Math.random() * max) + min);
  };

  useEffect(() => {
    if (random == "") {
      console.log("Add Record");
    } else {
      AddRecord(random);
      console.log(random)
    }
  }, [random]);

  return (
    <div className="app">
      <div className="app__container">
      <button
      type="button"
      className="app__add-btn"
      onClick={() => {
        RandomNum(1, 10);
      }}
    >
      Add record
    </button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((index) => {
              return (
                <tr key={index.id}>
                  <td>{index.name}</td>
                  <td>
                    <button
                      type="button"
                      className="app__delete-btn"
                      onClick={() => DeleteRecord(index.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
