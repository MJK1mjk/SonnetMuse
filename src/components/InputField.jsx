import { useState, useRef, useEffect } from "react";
import { syllable } from "syllable";
import LastWord from "./functions/LastWord";
import "./styles/InputField.css";

export default function InputField(props) {
  const inputRef = useRef();
  const [syllablesCount, setSyllable] = useState(0);
  const [value, setValue] = useState("");
  const { changeRhyme, changeActive, valid, line, syllableNeeded, poem } = props;

  useEffect(() => {
    if (syllablesCount === syllableNeeded) changeRhyme(LastWord(value), line);
    else changeRhyme("", line);
  }, [value, syllableNeeded]);

  const handleOnClick = () => changeActive(line);

  const handleKeyPress = (event) => {
    if (event.code === "Enter") {
      event.preventDefault();
      setValue((v) => v.trim());
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
      if (event.target.value) return;
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
  };

  const paraParity = poem !== 2 ? Math.floor(line / 4) % 2 === 1 : line > 7;

  const inputStyle = {
    textAlign: paraParity ? "right" : "left",
    marginRight: paraParity ? 0 : "5%",
    marginLeft: paraParity ? "5%" : 0,
    marginTop:
      poem !== 2
        ? !(line % 4)
          ? "0.75rem"
          : 0
        : line === 0 || line === 8
        ? "1rem"
        : line === 4 || line === 11
        ? "0.5rem"
        : 0,
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
        onKeyUp={handleBack}
        onClick={handleOnClick}
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value);
          setSyllable((v) => syllable(ev.target.value));
        }}
      />
    </>
  );
}