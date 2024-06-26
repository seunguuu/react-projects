import { useState } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";

export default function TodoApp() {
  const [todo, setTodo] = useState([]);
  const styles = {
    backgroundColor: "#fff",
    margin: "0 auto",
    marginTop: "1rem",
    width: "50rem",
  };

  const onDoneHandler = (event) => {
    const checkbox = event.currentTarget;
    const id = parseInt(checkbox.value);

    // 변경되기 이전의 state를 가져와서 반복을 하는데
    // 새로운 메모리에 들어있는 객체 리터럴을 만들어서 반환
    setTodo((prevTodo) =>
      prevTodo.map((todo) => {
        if (todo.id === id) {
          todo.isDone = checkbox.checked;
        }
        return { ...todo };
      })
    );
  };

  return (
    <div style={styles}>
      <h4 style={{ padding: "1rem" }}>
        완료: {todo.filter((item) => item.isDone).length} / 미완료:{" "}
        {todo.filter((item) => !item.isDone).length}
      </h4>
      <ul>
        {todo.map((todo) => (
          <Todo key={todo.id} todo={todo}>
            <input
              type="checkbox"
              key={todo.id}
              defaultValue={todo.id}
              checked={todo.isDone ? "checked" : ""}
              onChange={onDoneHandler}
            />
          </Todo>
        ))}
      </ul>
      <AddTodo setTodo={setTodo} />
    </div>
  );
}
