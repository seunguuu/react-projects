import { Section } from "./components/Section.js";
import { DataSection } from "./components/DataSection.js";
import { useState } from "react";

function App() {
  /**
   * Section의 내용을 클릭했을 때 반응할 함수
   */
  const onClickHandler = () => {
    alert("클릭했습니다!");
  };

  // title state를 만듦 (초기값은 "Untitle")
  // 이 시점에 title의 값은 "untitle".
  const [title, setTitle] = useState("Untitle");

  // input box에서 keyUp 이벤트가 발생할 경우의 콜백
  const onKeyUpHandler = (event) => {
    // input box의 입력값을 받아옴.
    const value = event.currentTarget.value;
    // title state의 값을 변경
    // state는 setter를 통해 할당해야 한다!
    // 그렇지 않을 경우, 컴포넌트가 재실행 되지 않음.
    // 컴포넌트가 재실행 되어야만, 변경된 값으로 컴포넌트를 다시 그릴 수 있다.

    // state를 변경시키는 setTitle이 호출되는 순간
    // AppComponent는 재실행된다.
    // state는 Component가 최초로 실행될 때, 초깃값이 할당이 되고
    // state가 변경이 되어 App Component가 재실행이 되었을 때
    // title의 값은 마지막에 할당된 값으로 항상 유지.
    setTitle(value);
  };

  // 컴포넌트가 재실행되는지 확인하기 위해 console.log 작성
  console.log("Run App Component");
  console.log("title state: ", title);

  return (
    <main>
      {/** Props로 데이터를 전달할 때
       * 1. 문자열은 ""로 전송
       * 2. 그 외 모든 데이터는 {}에 작성.
       */}
      <input
        type="text"
        placeholder="컴포넌트 이름을 입력하세요."
        onKeyUp={onKeyUpHandler}
      />
      <Section title={title} color="#f00" onClick={onClickHandler} />
      <DataSection>state를 사용하지 않는 컴포넌트</DataSection>
    </main>
  );
}

export default App;
