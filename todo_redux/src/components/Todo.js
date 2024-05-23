import { useRef } from "react";
import { useDispatch } from "react-redux";

/**
 * Todo Item을 관리하는 Component
 * props: todo = { id: "", task: "", dueDate: "", isDone: false }
 */
export default function Todo({ todo, style }) {
  console.log("Run Todo");
  // todo 객체에서 id, task, dueDate, isDone 값을 구조분해해서 가져온다.
  const { id, task, dueDate, isDone } = todo;

  const styles = {
    ...style,
    borderBottom: "1px solid #ccc",
    padding: "1rem",
    display: "flex",
    color: isDone ? "#ccc" : "#333",
    textDecoration: isDone ? "line-through" : "none",
  };

  const checkboxRef = useRef();
  const todoDispatch = useDispatch();

  const onDoneHandler = () => {
    const checkbox = checkboxRef.current;
    const checked = checkbox.checked;

    const payload = { id, isDone: checked };
    todoDispatch({ type: "DONE", payload });
  };

  return (
    <li style={styles}>
      <div style={{ marginRight: "1rem" }}>
        <input
          type="checkbox"
          key={id}
          defaultValue={id}
          checked={isDone ? "checked" : ""}
          onChange={onDoneHandler}
          ref={checkboxRef}
        />
      </div>
      <div style={{ flexGrow: 1 }}>{task}</div>
      <div>{dueDate}</div>
    </li>
  );
}
