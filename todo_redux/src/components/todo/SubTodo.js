// import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AddTodo from "./AddTodo";
import { doneSubTodo, loadTodo } from "../../stores/toolkit/store";

export default function SubTodo() {
  //   const sampleData = [
  //     {
  //       id: "sample1",
  //       isDone: false,
  //       task: "Sample Task1",
  //       dueDate: "2024-05-24",
  //     },
  //     {
  //       id: "sample2",
  //       isDone: true,
  //       task: "Sample Task2",
  //       dueDate: "2024-05-25",
  //     },
  //   ];

  const { id } = useParams();

  console.log("Run SubTodo", id);

  const styles = {
    display: "flex",
    borderBottom: "1px solid #ccc",
    padding: "1rem",
  };

  // React Router의 Path를 이동시키는 Hook
  // Spring의 redirect와 유사.
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/todo");
  };

  const todoDispatch = useDispatch();
  // Firebase에서 모든 todo를 받아오는 코드.
  // Thunk 호출 필요
  todoDispatch(loadTodo());

  // Redux Toolkit의 state를 받아온다.
  const todo = useSelector((state) =>
    state.todo.find((item) => item.id === parseInt(id))
  );

  console.log(todo);

  const getSubTodoItems = () => {
    const todoArrays = [];
    for (let key in todo.sub) {
      todoArrays.push(todo.sub[key]);
    }
    return todoArrays;
  };

  const subItems = todo && todo.sub ? getSubTodoItems() : [];

  const onDoneHandler = (event, item) => {
    const checkbox = event.currentTarget;
    const checked = checkbox.checked;
    console.log(checked);

    // Thunk Dispatch 코드
    todoDispatch(
      doneSubTodo({
        parentTodoId: parseInt(id),
        id: item.id,
        isDone: checked,
        task: item.task,
        dueDate: item.dueDate,
      })
    );
  };

  return (
    <>
      {todo && <h3 style={{ padding: "1rem" }}>'{todo.task}'의 하위 목록</h3>}

      <h4 style={{ padding: "1rem" }}>
        완료: {subItems.filter((item) => item.isDone).length} / 미완료:{" "}
        {subItems.filter((item) => !item.isDone).length}
      </h4>
      <div className="button-area right-align">
        <button onClick={onClickHandler}>상위 목록으로 가기</button>
      </div>
      <ul>
        {subItems.map((subTodo) => (
          <li
            key={subTodo.id}
            style={{
              ...styles,
              color: subTodo.isDone ? "#ccc" : "#333",
              textDecoration: subTodo.isDone ? "line-through" : "none",
            }}
          >
            <div style={{ marginRight: "1rem" }}>
              <input
                type="checkbox"
                key={subTodo.id}
                defaultValue={subTodo.id}
                checked={subTodo.isDone ? "checked" : ""}
                onChange={(event) => onDoneHandler(event, subTodo)}
              />
            </div>
            <div style={{ flexGrow: 1 }}>{subTodo.task}</div>
            <div>{subTodo.dueDate}</div>
          </li>
        ))}
      </ul>
      <AddTodo
        //  sub에 add 시키기 위한 값
        sub={true}
        parentTodoId={parseInt(id)}
        style={{
          display: "flex",
          padding: "0.5rem",
          marginTop: "1rem",
        }}
      />
    </>
  );
}
