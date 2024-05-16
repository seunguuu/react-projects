import { forwardRef } from "react";

const Input = forwardRef(({ id, type, title }, ref) => {
  return (
    <>
      <label htmlFor={id}>{title}</label>
      <input type={type} id={id} ref={ref} />
    </>
  );
});

export default Input;
