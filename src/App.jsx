import { useState, useEffect, useRef } from "react";
import InputField from "./components/InputField";
import Tabs from "./components/Tabs";
import scheme from './components/rhymingScheme'
import "./App.css";
import rhymesWith from "rhymes-with";

function App() {
  const [rhymes, setRhymes] = useState(new Array(14).fill(""));
  const [valid, setValid] = useState(new Array(14).fill(false));
  const [active, setActive] = useState(-1);

  // useEffect(() => {
  //   const Rhymes = [];
  //   const Valid = [];
  //   for (let i = 0; i < 14; i++) {
  //     Rhymes.push("");
  //     Valid.push(false);
  //   }
  //   setRhymes(Rhymes);
  //   setValid(Valid);
  // }, []);

  useEffect(() => {
    let newValid = [...valid];
    for (let i = 0; i < 14; i++) {
      if(rhymes[i])
      {
        let word=rhymes[scheme[i]];
        if(word)
        {
          const check= rhymesWith(rhymes[i],word);
          if(check) newValid[i]=true;
          else newValid[i]=false;
        }
      }
    }
    setValid(newValid);
  }, [rhymes]);

  const changeRhyme = (val, id) => {
    let arr = [...rhymes];;
    if (arr[id] !== val) {
      arr[id] = val;
      setRhymes(arr);
    }
  };

  const changeActive = (val) => setActive(val);

  const inputFields = [];
  for (let i = 0; i < 14; i++) {
    inputFields.push(
      <InputField
        key={`line-${i}`}
        changeRhyme={changeRhyme}
        changeActive={changeActive}
        valid={valid}
        line={i}
      />
    );
  }

  return (
    <main>
      <div className="Input-Container">
        <input type="text" key="title" className="title"/>
        {inputFields.map((a) => a)}
      </div>
      <Tabs rhymes={rhymes} active={active} />
    </main>
  );
}

export default App;
