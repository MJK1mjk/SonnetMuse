import { useState, useRef, useEffect } from "react";
import { syllableCount } from "syllable-count-english";
import './InputField.css'

const punctuation = [".", "?", "!", ",", ";", ":", "-"];

export default function InputField(props) {
  const inputRef = useRef();
  const [syllable, setSyllable] = useState(0);
  const [value, setValue] = useState("");
  const { changeRhyme, changeActive, valid, line } = props;

  useEffect(() => {
    let check = syllable === 10;
    if (check) {
      let word = value.split(" ").slice(-1)[0];
      while (punctuation.includes(word[word.length - 1]))
        word = word.slice(0, word.length - 1);
      changeRhyme(word, line);
    } else changeRhyme("", line);
  }, [value]);

  const handleOnClick = () => changeActive(line);

  const handleKeyPress = (event) => {
    if (event.code === "Enter") {
      event.preventDefault();
      const nextInput = inputRef.current.nextSibling;
      if (nextInput && nextInput.tagName === "INPUT") {
        changeActive(line + 1);
        nextInput.focus();
        nextInput.setSelectionRange(
          nextInput.value.length,
          nextInput.value.length
        );
      }
    }
  };

  const handleBack = (event) => {
    if (event.code === "Backspace") {
      if(event.target.value) return;
      const nextInput = inputRef.current.previousSibling;
      if (nextInput && nextInput.tagName === "INPUT") {
        changeActive(line - 1);
        nextInput.focus();
        nextInput.setSelectionRange(
          nextInput.value.length,
          nextInput.value.length
        );
      }
    }
  }

  const paraParity = (Math.floor(line/4))%2 === 1;

  const inputStyle = {
    textAlign: paraParity ? "right" : "left",
    marginRight: paraParity ? 0 : "5%",
    marginLeft: paraParity ? "5%" : 0,
    marginTop: !(line%4) ? "0.75rem" : 0,
  };

  return (
    <>
      <input
        type="text"
        className={`InputField ${valid[line] ? "correct" : "wrong"}`}
        style={inputStyle}
        placeholder={`Line ${line + 1}`}
        ref={inputRef}
        onKeyPress={handleKeyPress}
        onKeyDown={handleBack}
        onClick={handleOnClick}
        onChange={(ev) => {
          setValue(ev.target.value);
          setSyllable((v) => syllableCount(value));
        }}
      />
    </>
  );
}
