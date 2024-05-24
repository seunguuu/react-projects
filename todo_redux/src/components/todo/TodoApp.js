import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTodo } from "../../stores/toolkit/store";

export default function TodoApp() {
  console.log("Run TodoApp");

  // 1. React Redux에서 todo state를 받아오기
  // React redux가 관리하는 state는 읽기 전용.
  // state를 원하는 형태로 복제해서 사용.
  const todo = useSelector((state) => [...state.todo]);

  // store의 reducer 호출
  const todoDispatch = useDispatch();
  todoDispatch(loadTodo());

  // 2. setTodo를 대체하기 위해서 useDispatch를 사용.
  //    TodoApp 컴포넌트에서는 굳이 이벤트 함수를 만들 필요가 없다.
  //    - State 관리는 TodoApp 컴포넌트가 하지 않기 때문.
  //    - State를 변경시켜주는 함수가 필요 없다!

  const flexStyles = useMemo(() => {
    return {
      display: "flex",
      padding: "0.5rem",
      marginTop: "1rem",
    };
  }, []);

  const styles = {
    backgroundColor: "#fff",
    margin: "0 auto",
    marginTop: "1rem",
    width: "50rem",
  };

  return (
    <div style={styles}>
      <h4 style={{ padding: "1rem" }}>
        완료: {todo.filter((item) => item.isDone).length} / 미완료:{" "}
        {todo.filter((item) => !item.isDone).length}
      </h4>
      <ul>
        {todo.map((todo) => (
          <Todo key={todo.id} todo={todo} style={flexStyles} />
        ))}
      </ul>
      <AddTodo style={flexStyles} />
    </div>
  );
}
