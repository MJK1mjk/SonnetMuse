import { useState , useEffect } from "react";
import Slider from "./Slider";
import "./styles/Modal.css";
import "./styles/Settings.css";

export default function Modal(props) {
  const { open, onClose , syllableNeeded , setSyllableNeeded , lines , setLines , poem , setPoem } = props;
  if (open !== 1) return null;
  const [stanzas, setStanzas] = useState(Math.ceil(lines/4));

  const handlePoemChange = event => setPoem(Number(event.target.value));

  useEffect(() => {
    poem<=2 ? setLines(14) : setLines(stanzas*4);
  }, [stanzas,poem]);

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <h2 className="modal-header">Settings</h2>
        <p className="closeBtn" onClick={onClose}>
          x
        </p>
        <Slider
          min={2}
          max={14}
          value={syllableNeeded}
          setValue={setSyllableNeeded}
          data={"Syllables"}
        />
        <h3 className="poem-head">Select Poem Style:</h3>
        <div className="poem-type-container">
          <label className="poem-type">
            <input
              type="radio"
              value="1"
              checked={poem === 1}
              onChange={handlePoemChange}
            />
            Shakespearean Sonnet
          </label>
          <label className="poem-type">
            <input
              type="radio"
              value="2"
              checked={poem === 2}
              onChange={handlePoemChange}
            />
            Petrarchan Sonnet
          </label>
          <label className="poem-type">
            <input
              type="radio"
              value="3"
              checked={poem >= 3}
              onChange={handlePoemChange}
            />
            Custom
          </label>
        </div>
        {poem>=3 && (
          <>
            <Slider
              min={1}
              max={5}
              value={stanzas}
              setValue={setStanzas}
              data={"Stanzas"}
            />
            <div>
              <h3 className="poem-head">Select Rhyming Scheme:</h3>
              <div className="rhyme-scheme-container">
                <label className="rhyme-type">
                  <input
                    type="radio"
                    value="3"
                    checked={poem === 3}
                    onChange={handlePoemChange}
                  />
                  ABAB
                </label>
                <label className="rhyme-type">
                  <input
                    type="radio"
                    value="4"
                    checked={poem === 4}
                    onChange={handlePoemChange}
                  />
                  ABBA
                </label>
                <label className="rhyme-type">
                  <input
                    type="radio"
                    value="5"
                    checked={poem === 5}
                    onChange={handlePoemChange}
                  />
                  AABB
                </label>
                <label className="rhyme-type">
                  <input
                    type="radio"
                    value="6"
                    checked={poem === 6}
                    onChange={handlePoemChange}
                  />
                  ABCB
                </label>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
