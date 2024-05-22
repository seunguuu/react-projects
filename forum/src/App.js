import { useEffect, useState } from "react";
import Header from "./components/Header";
import BoardApp from "./components/BoardApp";
import { loadMyData } from "./http/http";

export default function App() {
  const [token, setToken] = useState();

  const [myInfo, setMyInfo] = useState();

  useEffect(() => {
    const loadMember = async () => {
      if (!token) {
      }
      const json = await loadMyData(token);

      setMyInfo(json.body);
    };
    loadMember();
  }, [token]);

  return (
    <div className="main-container">
      <Header token={token} setToken={setToken} myInfo={myInfo} />
      <main>
        <BoardApp token={token} myInfo={myInfo} />
      </main>
    </div>
  );
}

// function App() {
//   // 서버가 발생해준 토큰을 기억하기 위한 State 생성.
//   const [token, setToken] = useState();

//   // React 에서 Spring Server로 데이터를 요청.
//   // API로만 통신. 요청 JSON ---> JSON 응답.
//   // AJAX --> iframe + Form Request
//   // form 요청 ---> JSON / HTML

//   // API --> Browser --> Server
//   // JSON 요청 --> JSON

//   // Javascript의 내장 함수 (API 요청)
//   // 비동기 통신
//   // await가 동작하기 위해서는 상위 함수가 async 함수여야 한다.
//   // const response = await fetch("URL", Header ==> {});

//   // Spring Server에 접근하기 위한 JWT 발급.
//   // useEffect는 반환타입이 없기 때문에 useEffect만 적어줘도 된다.
//   useEffect(() => {
//     // stringify : Object -> String
//     // parse : String -> Object
//     const loadToken = async () => {
//       const response = await fetch("http://localhost:8080/auth/token", {
//         body: JSON.stringify({
//           email: "admin@admin.com",
//           password: "password1234",
//         }),
//         method: "POST",
//         // 내가 보내는 데이터 형식이 JSON 형식이라고 알려줘야 한다.
//         headers: {
//           // URL을 어떤 방식으로 호출을 할것인지 적어준다.
//           // JSON의 MimeType을 적어준다.
//           "Content-Type": "application/json",
//         },
//       });

//       console.log(response);

//       // response에서 body의 값을 알고 싶을 때, response.json()을 호출.
//       // response.json() 함수 또한 비동기 함수.
//       // await response.json();
//       const body = await response.json();
//       console.log(body);

//       setToken(body.token + Math.random());
//     };

//     loadToken();
//   }, []);

//   // 이 컴포넌트가 실행될 때, 아이디와 패스워드를 통해
//   // 서버에게 로그인을 시도한다.
//   // 로그인 결과인 token을 가져와서 브라우저가 기억하도록 한다.

//   return <>{token}</>;
// }

// export default App;
