import { useState , useRef, useEffect } from "react";
import "./styles/Rhymer.css";

export default function Dictionary(props) {
  const buttonRef = useRef(null);
  const { word , setWord , search , setSearch} = props;
  const [data, setData] = useState("");

  useEffect(()=>{
    if(search){
      buttonRef.current.click();
      setSearch(false);
    }
  },[search]);

  function handleClick(event) {
    event.preventDefault();
    const controller = new AbortController();
    const { signal } = controller;
    if (word) {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
        signal,
      }).then((response) => {
        response.json().then((res) => {
          const arr = [];
          for (let i of res) {
            const meanings = i.meanings;
            for (let j of meanings) {
              const part = j.partOfSpeech;
              const def = j.definitions;
              for (let k of def) {
                const def = k.definition;
                arr.push({ part, def });
              }
            }
          }
          setData(arr);
        });
      });
    }
    return () => controller.abort();
  }
  return (
    <div className="container">
      <form action="">
        <input
          type="text"
          placeholder="Your Word"
          id="word-def"
          value={word}
          onChange={(ev) => setWord(ev.target.value)}
        />
        <button ref={buttonRef} onClick={handleClick} id="word-def-button">
          Search
        </button>
      </form>
      {data && (
        <ul className="list definitions">
          {data.map((item, i) => (
            <li key={`d${i}`}>
              <span>{item.part}</span> {item.def}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
