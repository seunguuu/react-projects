import { useCallback, useMemo, useState } from "react";
import BoardApp from "./BoardApp.js";
import Header from "./Header.js";
import { loadMyData } from "../../http/http.js";
import { useFetch } from "../../hooks/useFetch.js";

export default function ForumApp() {
  const [token, setToken] = useState();

  // Component를 실행시키자마자 API 요청으로 데이터를 받아오는 부분
  const fetchLoadMyData = useCallback(loadMyData, [token]);

  // 토큰이 바뀌면 객체 리터럴이 다시 생성되어서 실행해라
  const fetchToken = useMemo(() => {
    return { token };
  }, [token]);

  const { data } = useFetch(undefined, fetchLoadMyData, fetchToken);
  // 사용자 정보
  const { body: myInfo } = data || {};

  return (
    <>
      <Header token={token} setToken={setToken} myInfo={myInfo} />
      <main>
        <BoardApp token={token} myInfo={myInfo} />
      </main>
    </>
  );
}
