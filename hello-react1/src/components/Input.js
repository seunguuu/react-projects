import { useState } from "react";

export function Input({ setTextArray }) {
  // 텍스트를 관리하는 state
  // 기본값 : undefined
  const [text, setText] = useState();
  // 지금까지 입력한 text를 관리하는 배열 state
  // 기본값 : undefined ==> []

  const onKeyUpHandler = (event) => {
    const textValue = event.currentTarget.value;
    setText(textValue);
  };

  const onClickHandler = () => {
    // textArray = []
    // textArray = ["abc"]
    // setTextArray([...textArray, text]);
    // 새로운 배열 만들기
    setTextArray((prevState) => [...prevState, text]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="텍스트를 입력하세요."
        onKeyUp={onKeyUpHandler}
      />
      <button onClick={onClickHandler}>입력</button>
    </div>
  );
}
