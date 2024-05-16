import { useState, useRef } from "react";
import AlertModal from "./modal/AlertModal.js";
import Input from "./ui/Input.js";

export function RefComponent() {
  const alertModalRef = useRef();

  const [textArray, setTextArray] = useState([]);
  const itemRef = useRef();

  const onClickHandler = () => {
    const item = itemRef.current.value;

    // 비어있는지 체크
    if (item === "") {
      //   alert("값을 입력하세요.");
      console.log(alertModalRef.current);
      alertModalRef.current.showModal();

      itemRef.current.focus();
      return;
    }

    // 배열에 값 추가
    setTextArray((prevState) => [...prevState, item]);

    // input 초기화
    itemRef.current.value = "";
  };

  const onCloseModalHandler = () => {
    alertModalRef.current.close();
  };

  return (
    <div className="main-container">
      <Input id="text" type="text" title="Text" ref={itemRef} />
      <button onClick={onClickHandler}>Save</button>

      <hr />

      {/** 배열 반복 */}
      <ul>
        {textArray.map((data, index) => (
          <li key={index}>{data}</li>
        ))}
      </ul>

      <AlertModal onClose={onCloseModalHandler} ref={alertModalRef}>
        <div>
          <h3>텍스트를 입력하세요 !</h3>
        </div>
      </AlertModal>
    </div>
  );
}
