import Todo from "./Todo";
import AddTodo from "./AddTodo";

export default function TodoApp({ todo, setTodo }) {
  const styles = {
    backgroundColor: "#fff",
    margin: "0 auto",
    marginTop: "1rem",
    width: "50rem",
  };

  const onDoneHandler = (event) => {
    const checkbox = event.currentTarget;
    const id = parseInt(checkbox.value);

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
          <Todo key={todo.id} todo={todo} onDone={onDoneHandler} />
        ))}
      </ul>
      <AddTodo setTodo={setTodo} />
    </div>
  );
}
