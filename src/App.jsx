import { useState, useEffect, useRef } from "react";
import InputField from "./components/InputField";
import Tabs from "./components/Tabs";
import scheme from './components/rhymingScheme'
import "./App.css";
import rhymesWith from "rhymes-with";

function App() {
  const [rhymes, setRhymes] = useState([]);
  const [valid, setValid] = useState([]);
  const [checkLine, setCheckLine] = useState([]);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const Rhymes = [];
    const Valid = [];
    const CheckLines = [];
    for (let i = 0; i < 14; i++) {
      Rhymes.push("");
      Valid.push(false);
      CheckLines.push(false);
    }
    setRhymes(Rhymes);
    setValid(Valid);
    setCheckLine(CheckLines);
  }, []);

  useEffect(() => {
    let CheckLines = checkLine;
    for (let i = 0; i < 14; i++) {
      if(rhymes[i])
      {
        let word=rhymes[scheme[i]];
        if(word)
        {
          const check= rhymesWith(rhymes[i],word);
          if(check) CheckLines[i]=true;
          else CheckLines=false;
        }
      }
    }
    setCheckLine(CheckLines);
  }, [rhymes]);

  const changeValid = (val, id) => {
    let arr = valid;
    if (arr[id] != val) {
      arr[id] = val;
      setValid(arr);
    }
  };

  const changeRhyme = (val, id) => {
    let arr = rhymes;
    if (arr[id] != val) {
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
        changeValid={changeValid}
        changeRhyme={changeRhyme}
        changeActive={changeActive}
        valid={valid}
        line={i}
      />
    );
  }

  return (
    <main>
      <div className="Input-Container">{inputFields.map((a) => a)}</div>
      <Tabs rhymes={rhymes} active={active} />
    </main>
  );
}

export default App;
