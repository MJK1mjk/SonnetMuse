import { useState,useEffect } from 'react';
import scheme from './rhymingScheme'
import './Rhymer.css'

export default function Dictionary(){
    const [word,setWord] =useState("");
    const [data,setData] =useState("");

    function handleClick(event) {
        event.preventDefault();
        const controller = new AbortController();
        const { signal } = controller;
        if(word){
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, { signal }).then( response =>{
            response.json().then(res => {
                const arr=[];
                for(let i of res){
                  const meanings=i.meanings;
                  for(let j of meanings){
                    const part=j.partOfSpeech;                    ;
                    const def=j.definitions;
                    for(let k of def)
                    {
                      // arr.push(`(${part}) ${k.definition}`)
                      const def=k.definition;
                      arr.push({part,def})
                    }
                  }
                }
                setData(arr);
            });
        })
        }
    return () => {
        controller.abort();
        };    
    };
    return (
      <div className="container">
        <form action="">
          <input type="text" 
               placeholder="Your Word"
               id="word-def"
               onChange={ev => setWord(ev.target.value)}
              />
          <button onClick={handleClick} id="word-def-button">Search</button>
        </form>
        {data && (
        <ul className="list definitions">
          {data.map((item,i) => (
            <li key={`d${i}`}><span>{item.part }</span>  {item.def}</li>
          ))}
        </ul>
      )}
      </div>
    );
};
