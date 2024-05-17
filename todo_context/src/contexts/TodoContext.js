import { createContext, useState } from "react";

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
  const [todo, setTodo] = useState([]);

  // Provider가 관리할 State와 함수들을 작성.
  const contextValue = {
    todo, // todo: todo,
    done(event) {
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
    },
    add(task, dueDate) {
      setTodo((prevTodos) => [
        ...prevTodos,
        {
          id: prevTodos.length,
          isDone: false,
          task, // task: task,
          dueDate, // dueDate: dueDate,
        },
      ]);
    },
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
}
