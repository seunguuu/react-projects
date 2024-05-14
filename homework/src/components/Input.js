import { useState } from "react";

export function Input({ setTextArray }) {
  const [name, setName] = useState();
  const [age, setAge] = useState();

  const nameValueHandler = (event) => {
    const nameValue = event.currentTarget.value;
    setName(nameValue);
  };

  const ageValueHandler = (event) => {
    const ageValue = event.currentTarget.value;
    setAge(ageValue);
  };

  const onClickHandler = () => {
    setTextArray((prevState) => [
      ...prevState,
      {
        name: name,
        age: age,
      },
    ]);
  };

  return (
    <div>
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" onKeyUp={nameValueHandler} />
      </div>

      <div>
        <label htmlFor="age">Age: </label>
        <input type="text" id="age" onKeyUp={ageValueHandler} />
      </div>

      <div>
        <button onClick={onClickHandler}>저장</button>
      </div>
    </div>
  );
}
