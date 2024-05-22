import { useState } from "react";

/**
 * 함수의 이름이 use로 시작하면 React는 Custom Hook으로 인식한다.
 */
export function useTimeout() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    // 3초 뒤에 setData 호출됨
    setData((prevData) => [...prevData, "new Data "]);
    setIsLoading(false);
  }, 3000);

  return { data, isLoading };
}
