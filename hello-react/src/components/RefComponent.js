import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import AlertModal from "./modal/AlertModal.js";
import Input from "./ui/Input.js";

export function RefComponent() {
  const alertModalRef = useRef();
  const completeModalRef = useRef();

  const [textArray, setTextArray] = useState([]);
  const itemRef = useRef();

  const onClickHandler = () => {
    // const item = itemRef.current.value;
    const item = itemRef.current.get();

    // 비어있는지 체크
    if (item === "") {
      //   alert("값을 입력하세요.");
      console.log(alertModalRef.current);
      alertModalRef.current.open();

      //   itemRef.current.focus();
      itemRef.current.select();
      return;
    } else {
      completeModalRef.current.open();
      itemRef.current.select();
    }

    // 배열에 값 추가
    // setTextArray((prevState) => [...prevState, item]);
    setTextArray((prevState) => [item, ...prevState]);

    // input 초기화
    // itemRef.current.value = "";
    itemRef.current.set("");
    // itemRef.current.focus();
    itemRef.current.select();
  };

  const onCloseModalHandler = () => {
    alertModalRef.current.close();
  };

  const onCloseCompleteModalHandler = () => {
    completeModalRef.current.close();
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

      {createPortal(
        <AlertModal
          onClose={onCloseCompleteModalHandler}
          ref={completeModalRef}
        >
          <div>
            {/* <h3>{textArray[textArray.length - 1]}을 입력했습니다.</h3> */}
            <h3>{textArray[0]}을 입력했습니다.</h3>
          </div>
        </AlertModal>,
        document.querySelector("#modals")
      )}

      {createPortal(
        <AlertModal onClose={onCloseModalHandler} ref={alertModalRef}>
          <div>
            <h3>텍스트를 입력하세요 !</h3>
          </div>
        </AlertModal>,
        document.querySelector("#modals")
      )}
    </div>
  );
}
