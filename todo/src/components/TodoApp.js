import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { useCallback, useMemo } from "react";

export default function TodoApp({ todo, setTodo }) {
  console.log("Run TodoApp");

  // 객체를 obj에 할당시키는데 값이 변경되면 [todo] 가 감지해서
  // 다시 obj에 할당하는 방식으로 동작
  // const obj = useMemo(() => {
  //   return {A: 1, B: 2, todo: todo};
  // }, [todo]);

  // 의존 배열이 비어있기 때문에 한번 생성되고 flexStyles 로 할당되면
  // 이후에는 값이 절대로 바뀌지 않기 때문에 재실행되지 않는다.
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

  // [] <== Component가 처음 실행될 때에만 동작 (의존 배열)
  // const fn = useCallback(() => {}, []);

  // [todo] <== todo가 변경되었다면, 함수를 재생성하는 의존 배열
  //            todo가 변경되었을 때 동작.
  // const fn = useCallback(() => {}, [todo]);

  const onTodoHandler = useCallback(
    (task, dueDate) => {
      setTodo((prevTodos) => [
        ...prevTodos,
        {
          id: prevTodos.length,
          isDone: false,
          task,
          dueDate,
        },
      ]);
    },
    [setTodo]
  );

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
          <Todo
            key={todo.id}
            todo={todo}
            onDone={onDoneHandler}
            style={flexStyles}
          />
        ))}
      </ul>
      <AddTodo onAdd={onTodoHandler} style={flexStyles} />
    </div>
  );
}
