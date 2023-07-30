import { useState, useEffect } from "react";
import "./styles/Rhymer.css";

export default function Rhymer(props) {
  const { rhymes, active , pattern , setWord , change , setSearch } = props;
  const [data, setData] = useState("");

  useEffect(() => {
    if (active !== -1) {
      const controller = new AbortController();
      const { signal } = controller;
      const word = pattern[active] !== active ? rhymes[pattern[active]] : "";
      if (word) {
        fetch(`https://api.datamuse.com/words?rel_rhy=${word}`, {
          signal,
        }).then((response) => {
          response.json().then((words) => {
            setData(words);
          });
        });
      } else setData("");
      return () => controller.abort();
    }
  }, [rhymes, active]);

  const handleClick = word => {
    setWord(word);
    setSearch(true);
    change();
  }; 

  return (
    <div className="container">
      {data && (
        <>
          <p id="word-rhyme">Your Word</p>
          <ul className="list rhymes">
            {data.map((item, i) => (
              <li key={`r${i}`}><span onClick={() => handleClick(item.word)}>{item.word}</span></li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
