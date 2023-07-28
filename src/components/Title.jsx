import { useRef } from "react";

export default function InputField(props) {
  const inputRef = useRef();
  const { changeActive } = props;

  const handleOnClick = () => changeActive(-1);

  const handleKeyPress = (event) => {
    if (event.code === "Enter") {
      event.preventDefault();
      const nextInput = inputRef.current.nextSibling;
      if (nextInput && nextInput.tagName === "INPUT") {
        changeActive(0);
        nextInput.focus();
        nextInput.setSelectionRange(
          nextInput.value.length,
          nextInput.value.length
        );
      }
    }
  };

  return (
    <>
      <input
        type="text"
        className="title"
        placeholder="Title"
        ref={inputRef}
        onKeyPress={handleKeyPress}
        onClick={handleOnClick}
      />
    </>
  );
}
