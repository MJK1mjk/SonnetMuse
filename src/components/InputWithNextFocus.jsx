import React, { useRef } from 'react';

const withNextFocus = (WrappedComponent) => {
  const InputWithNextFocus = (props) => {
    const inputRef = useRef(null);

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const nextInput = inputRef.current.nextSibling;
        if (nextInput && nextInput.tagName === 'INPUT') {
          nextInput.focus();
          nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
        }
      }
    };

    return (
      <WrappedComponent
        {...props}
        ref={(el) => (inputRef.current = el)}
        onKeyPress={handleKeyPress}
      />
    );
  };

  return React.forwardRef((props, ref) => {
    return <InputWithNextFocus {...props} forwardedRef={ref} />;
  });
};

const Input = React.forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

const InputWithNextFocus = withNextFocus(Input);

export default InputWithNextFocus;