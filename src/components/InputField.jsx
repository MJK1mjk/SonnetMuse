import { useState,useRef,useEffect } from 'react';
import {syllableCount} from "syllable-count-english";

const punctuation = ['.','?','!',',',';',':','-']

export default function InputField(props){
    const inputRef = useRef();
    const [syllable,setSyllable] = useState(0);
    const [value,setValue] = useState("");
    const {changeRhyme,changeActive,valid,line} =props;

    useEffect(() => {
      let check = syllable===10;
      if(check)
      {
        let word=value.split(" ").slice(-1)[0];
        while(punctuation.includes(word[word.length-1])) word=word.slice(0,word.length-1)
        changeRhyme(word,line);
      }
      else changeRhyme("",line);
    }, [value]);
    
    const handleOnClick = () => changeActive(line);

    const handleKeyPress = (event) => {
        if (event.code === 'Enter') {
          event.preventDefault();
          const nextInput = inputRef.current.nextSibling;
          if (nextInput && nextInput.tagName === 'INPUT') {
            changeActive(line+1)
            nextInput.focus();
            nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
          }
        }
      };
    return (
      <>
        <input type="text" 
               className={`InputField ${valid[line] ? 'correct' : 'wrong'}`}
               placeholder={`Line ${line+1}`} 
               ref={inputRef}
               onKeyPress={handleKeyPress}
               onClick={handleOnClick}
               onChange={ev => {
                setValue(ev.target.value);
                setSyllable(v => syllableCount(value));
                }}/>
      </>
    )
}