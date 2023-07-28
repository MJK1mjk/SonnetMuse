import { useState, useEffect, useRef } from "react";
import InputField from "./components/InputField";
import Tabs from "./components/Tabs";
import Title from "./components/Title";
import Modal from './Modal';
import scheme from "./components/rhymingScheme";
import rhymesWith from "rhymes-with";
import "./App.css";

function App() {
  const [rhymes, setRhymes] = useState(new Array(14).fill(""));
  const [valid, setValid] = useState(new Array(14).fill(false));
  const [active, setActive] = useState(-1);
  const [openModal, setOpenModal] = useState(true);

  useEffect(() => {
    let newValid = [...valid];
    for (let i = 0; i < 14; i++) {
      if (rhymes[i]) {
        let word = rhymes[scheme[i]];
        if (word) {
          const check = rhymesWith(rhymes[i], word, {
            allPronounciations: true,
          });
          if (check) newValid[i] = true;
          else newValid[i] = false;
        }
      }
    }
    setValid(newValid);
  }, [rhymes]);

  const changeRhyme = (val, id) => {
    let arr = [...rhymes];
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
    <div>
      <nav>
        <h1>SonnetMuse</h1>
        <button onClick={() => setOpenModal(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info">
            <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </button>
      </nav>
      <main>
        <div className="Input-Container">
          <Title changeActive={changeActive} />
          {inputFields.map((a) => a)}
        </div>
        <Tabs rhymes={rhymes} active={active} />
      </main>
      <Modal open={openModal} onClose={() => setOpenModal(false)}/>
    </div>
  );
}

export default App;
