import { useState, useEffect} from "react";
import InputField from "./components/InputField";
import Tabs from "./components/Tabs";
import Title from "./components/Title";
import Author from "./components/Author";
import Modal from './components/Modal';
import Settings from './components/Settings';
import rhymesWith from "rhymes-with";
import { syllable } from "syllable";
import pdf from "./components/functions/pdfDownload"
import LastWord from "./components/functions/LastWord";
import rhymingSchemes from "./components/functions/rhymingScheme";
import "./App.css";

function App() {
  const [lines, setLines] = useState(14);
  const [rhymes, setRhymes] = useState(new Array(lines).fill(""));
  const [valid, setValid] = useState(new Array(lines).fill(false));
  const [active, setActive] = useState(-1);
  const [syllableNeeded, setSyllableNeeded] = useState(10);
  const [openModal, setOpenModal] = useState(2);
  const [download, setDownload] = useState(false);
  const [poem, setPoem] = useState(1);

  const pattern=rhymingSchemes[poem];

  useEffect(() => {
    let newValid = [...valid];
    rhymes.forEach((rhyme,i)=>{
      if (rhyme) {
        let word = rhymes[pattern[i]];
        if (word) newValid[i] = rhymesWith(rhyme, word, {allPronounciations: true,});
      }
      else newValid[i]=false;
    })
    setValid(newValid);
  }, [rhymes,poem]);

  useEffect(()=> {
    let check=true;
    valid.forEach( v => check &= v )
    setDownload(check);
  },[valid])
  
  useEffect(() => {
    let newRhymes = new Array(lines).fill("");
    let newValid = new Array(lines).fill(false);
    for(let i =0;i<lines;i++){
      newRhymes[i]=rhymes[i];
      newValid[i]=valid[i];
    }
    setValid(newValid);
    setRhymes(newRhymes);
  }, [lines]);
  
  useEffect(() => {
    let newRhymes = new Array(lines).fill("");
    let newValid = new Array(lines).fill(false);
    const poemLines = document.getElementsByClassName("InputField");
    Array.from(poemLines).forEach((poemline,idx)=>{
      if(syllable(poemline.value)===syllableNeeded){
        newValid[idx]=true;
        newRhymes[idx]=LastWord(poemline.value);
      }
    });
    setValid(newValid);
    setRhymes(newRhymes);
  }, [syllableNeeded]);

  const changeRhyme = (val, id) => {
    let arr = [...rhymes];
    if (arr[id] !== val) {
      arr[id] = val;
      setRhymes(arr);
    }
  };

  const changeActive = val => setActive(val);

  const pdfDownload = e => pdf(e,poem,download)

  const inputFields = [];
  for (let i = 0; i < lines; i++) {
    inputFields.push(
      <InputField
        key={`line-${i}`}
        changeRhyme={changeRhyme}
        changeActive={changeActive}
        valid={valid}
        syllableNeeded={syllableNeeded}
        line={i}
        poem={poem}
      />
    );
  }

  return (
    <div>
      <nav>
        <h1>SonnetMuse</h1>
        <div>
        <button onClick={() => setOpenModal(1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
        <button onClick={() => setOpenModal(2)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-info">
            <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </button>
        </div>
      </nav>
      <main>
        <div className="Input-Container">
          <Title changeActive={changeActive} />
          {inputFields.map((a) => a)}
          <Author changeActive={changeActive} />
          <button id="download" onClick={pdfDownload} className={`${download ? "" : "hide"}`}>Download</button>
        </div>
        <Tabs rhymes={rhymes} active={active} pattern={pattern}/>
      </main>
      <Modal 
        open={openModal} 
        onClose={() => setOpenModal(0)}
      />
      <Settings 
        open={openModal} 
        onClose={() => setOpenModal(0)}
        syllableNeeded={syllableNeeded}
        setSyllableNeeded={setSyllableNeeded}
        lines={lines}
        setLines={setLines}
        poem={poem} 
        setPoem={setPoem}
      />
    </div>
  );
}

export default App;