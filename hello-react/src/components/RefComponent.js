import { useState, useRef } from "react";

export function RefComponent() {
  const [textArray, setTextArray] = useState([]);
  const dataRef = useRef();

  const onClickHandler = () => {
    const data = dataRef.current.value;

    // 비어있는지 체크
    if (data === "") {
      alert("값을 입력하세요.");
      dataRef.current.focus();
      return;
    }

    // 배열에 값 추가
    setTextArray((prevState) => [...prevState, data]);

    // input 초기화
    dataRef.current.value = "";
  };
  return (
    <div>
      {/** input과 button 생성 */}
      <input type="text" ref={dataRef} />
      <button onClick={onClickHandler}>Save</button>

      <hr />

      {/** 배열 반복 */}
      <ul>
        {textArray.map((data, index) => (
          <li key={index}>{data}</li>
        ))}
      </ul>
    </div>
  );
}
