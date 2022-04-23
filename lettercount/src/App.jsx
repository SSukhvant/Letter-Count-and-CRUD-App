import React, { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);

  const GetValue = (e) => {
    const val = e.target.value;
    setText(val);
  };

  const LetterOccurs = (strr) => {
    const s = strr.replace(/\s+/g, '');
    const str = s.toUpperCase();
    let res = [];
    if (str.length == 0) {
      console.log("Invalid string");
      return;
    }
    for (let i = 0; i < str.length; i++) {
      let count = 0;
      for (let j = 0; j < str.length; j++) {
        if (str[i] == str[j] && i > j) {
          break;
        }else if (str[i] == str[j]) {
          count++;
        }
      }
      if (count > 0) {
        console.log(`${str[i]}-${count}`);
        res.push(
          <p>
            {str[i]} - {count}
          </p>
        );
      }
    }
    setResult(res);
  };

  return (
    <div className="app">
      <div className="app__container">
        <input
          type="text"
          placeholder="Enter text"
          value={text}
          onChange={GetValue}
        />
        <button type="button" onClick={() => LetterOccurs(text)}>
          Count
        </button>
      </div>
      {result.map((index, key) => (
        <div key={key} className="app__output">{index}</div>
      ))}
    </div>
  );
}

export default App;