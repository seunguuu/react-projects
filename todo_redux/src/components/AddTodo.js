import { useRef, memo } from "react";
import { useDispatch } from "react-redux";
import { todoActions } from "../stores/toolkit/store";

/**
 * TODO 아이템을 등록하는 Component
 * App Component의 todo를 변경시키기 위해 setTodo 가 필요하다.
 */
export default memo(function AddTodo({ style }) {
  console.log("Run AddTodo");

  const labelStyles = { flexShrink: 1, margin: "0.5rem 1rem" };
  const inputStyles = { flexGrow: 1 };
  const buttonStyles = { flexShrink: 1, margin: "0 0 0 1rem" };

  const taskRef = useRef();
  const dueDateRef = useRef();

  const todoDispatch = useDispatch();

  /**
   * 등록 버튼을 클릭했을 때의 핸들러.
   * setTodo를 이용해서 TODO 아이템을 등록해야 한다.
   */
  const onClickHandler = () => {
    // onAdd(taskRef.current.value, dueDateRef.current.value);

    // toolkit Dispatch 코드
    todoDispatch(
      todoActions.add({
        // payload를 담아서 전달
        task: taskRef.current.value,
        dueDate: dueDateRef.current.value,
      })
    );

    // // redux Dispatch 코드
    // todoDispatch({
    //   type: "ADD-TODO",
    //   payload: {
    //     task: taskRef.current.value,
    //     dueDate: dueDateRef.current.value,
    //   },
    // });

    // 값 초기화
    taskRef.current.value = "";
    dueDateRef.current.value = "";
    // TASK 에 Focus
    taskRef.current.focus();
  };

  return (
    <div style={style}>
      <label htmlFor="task" style={labelStyles}>
        TASK
      </label>
      <input
        type="text"
        id="task"
        placeholder="Input task"
        style={inputStyles}
        ref={taskRef}
      />

      <label htmlFor="due-date" style={labelStyles}>
        Due date
      </label>
      <input type="date" id="due-date" style={inputStyles} ref={dueDateRef} />

      <button style={buttonStyles} onClick={onClickHandler}>
        등록
      </button>
    </div>
  );
});
