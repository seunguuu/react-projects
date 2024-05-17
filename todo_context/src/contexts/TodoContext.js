import { createContext, useReducer } from "react";
import { todoReducers } from "../reducers/todoReducers";

/**
 * Context Store 생성.
 * TodoContext를 이용할 때, 자동완성(Content Assist)을 이용하기 위해서
 * Store의 원형을 작성.
 */
const TodoContext = createContext({
  todo: [],
  done: (event) => {},
  add: (task, dueDate) => {},
});

export default TodoContext;

/**
 * Context Store의 내용을 제공하기 위해서
 * TodoContextProvider Component를 생성.
 */
export function TodoContextProvider({ children }) {
  /**
   * useReducer Hook을 이용해 State를 관리한다.
   * todoState: reducer가 관리할 State
   * todoDispatcher: Reducer에게 State 변경을 요청하는 함수
   *                 todoReducer() 함수를 호출하게 된다.
   */
  const [todoState, todoDispatcher] = useReducer(todoReducers, []);

  // Provider가 관리할 State와 함수들을 작성.
  const contextValue = {
    todo: todoState,
    done(event) {
      const checkbox = event.currentTarget;
      const id = parseInt(checkbox.value);

      todoDispatcher({
        type: "DONE",
        payload: { id, isDone: checkbox.checked },
      });
    },
    add(task, dueDate) {
      todoDispatcher({ type: "ADD", payload: { task, dueDate } });
    },
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
}
