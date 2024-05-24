import { useEffect, useState } from "react";

export function useFetch(initialValue, fnFetch, param) {
  // 통일성을 위해서 const [myInfo, setMyInfo] = useState(); 대신에
  // data를 적어주고 데이터타입도 파라미터로 받아온다.
  // Component에 useFetch가 쓰이게되는데
  // Component가 실행되자마자 useFetch가 동작하는데
  // 이렇게 되면 무한반복이 되기 때문에 useEffect를 사용해준다.

  // 이제 Fetching 하는 코드들을 통일시킬 수 있다.
  const [data, setData] = useState(initialValue);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchingData = async () => {
      const json = await fnFetch({ ...param });
      // body 말고도 json으로 받아오는 데이터들이 많기 때문에(ex. 다음 페이지)
      // .body는 지워준다.
      setData(json);
      setIsLoading(false);
    };

    fetchingData();
  }, [fnFetch, param]);

  return { data, isLoading, setData };
}
