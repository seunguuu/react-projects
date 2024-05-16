import { forwardRef, useImperativeHandle, useRef } from "react";

const Input = forwardRef(({ id, type, title }, ref) => {
  const inputDom = useRef();

  useImperativeHandle(ref, () => {
    return {
      get() {
        return inputDom.current.value;
      },
      set(data) {
        inputDom.current.value = data;
      },
      select() {
        inputDom.current.focus();
      },
    };
  });

  return (
    <>
      <label htmlFor={id}>{title}</label>
      <input type={type} id={id} ref={inputDom} />
    </>
  );
});

export default Input;
