import { useRef } from "react";

export default function InputField(props) {
  const inputRef = useRef();
  const { changeActive } = props;

  const handleOnClick = () => changeActive(-1);

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
  };

  return (
      <input
        type="text"
        className="author"
        id="author"
        placeholder="Author"
        ref={inputRef}
        onKeyDown={handleBack}
        onClick={handleOnClick}
      />
  );
}