import { useState,useEffect } from 'react';
import scheme from './rhymingScheme'
import './Rhymer.css'

export default function Rhymer(props){
    const {rhymes,active} = props;
    const [data,setData] =useState("");

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;
        const word=rhymes[scheme[active]];
        if(word){
        fetch(`https://api.datamuse.com/words?rel_rhy=${word}`, { signal }).then( response =>{
            response.json().then(words => {
                setData(words);
            });
        })
        }
    return () => {
        controller.abort();
        };    
    }, [rhymes,active]);
    return (
      <div className="RhymeTab">
        {data && (
        <ul className="RhymeList">
          {data.map(item => (
            <li key={item.id}>{item.word}</li>
          ))}
        </ul>
      )}
      </div>
    );
};