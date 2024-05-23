import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// 1. Slice Store 생성.
//      "todo" slice store 생성.
const todoSliceStore = createSlice({
  // slice store의 이름
  name: "todo slice", // target: "todo slice"
  // slice store의 초기 state 값.
  initialState: [],
  // slice store reducers 생성.
  reducers: {
    // Firebase에서 데이터를 가져오기 위함
    load(state, action) {
      if (state.length === 0) {
        state.push(...action.payload);
      }
    },
    // state: 변경 가능한 State, action: state를 변경시킬 값
    add(state, action) {
      console.log("todo > add: ", action);
      const payload = action.payload;

      // State를 직접 변경한다.
      state.push({
        id: payload.id,
        isDone: false,
        task: payload.task,
        dueDate: payload.dueDate,
      });
    },
    done(state, action) {
      console.log("todo > done: ", action);

      const payload = action.payload;
      // payload: {id: 2, isDone: true}
      /**
       * state: [
       *      {id: 0, isDone: false, task: "ABC1:, dueDate: "2024-05-23"},
       *      {id: 1, isDone: false, task: "ABC2:, dueDate: "2024-05-24"},
       *      {id: 2, isDone: false, task: "ABC3:, dueDate: "2024-05-25"},
       *      {id: 3, isDone: false, task: "ABC4:, dueDate: "2024-05-26"},
       * ]
       */
      // state에서 id가 2인 객체 리터럴의 index값을 알아야 한다.
      //    const index = state.findIndex(조건함수) 사용
      //    const index = state.findIndex(아이템 => 아이템.id === payload.id);
      // 만약, index값이 2 라면,
      // state[2].isDone = payload.isDone;

      // payload에서 id, isDone의 값을 객체 분해할당으로 가져온다.
      const { id, isDone } = payload;
      // state에서 index번째 payload.id의 isDone 값을 payload.isDone으로 할당.
      const index = state.findIndex((item) => item.id === id);
      state[index].isDone = isDone;
    },
  },
});

// 액션 생성자를 이용한 액션 정의
// Thunk => 액션 생성자
export const loadTodo = () => {
  return async (dispatch) => {
    // Firebase에서 Todo 목록을 가져와
    const url = "https://react-todo-5ddf8-default-rtdb.firebaseio.com/";
    const response = await fetch(`${url}/todo.json`, {
      method: "GET",
    });
    const json = await response.json();
    console.log(json);

    const todoList = [];
    for (let key in json) {
      //   console.log("key", key);
      //   console.log("value", json[key]);
      todoList.push(json[key]);
    }

    console.log(todoList);
    // todoSliceStore에 저장한다.
    dispatch(todoActions.load(todoList));
  };
};
export const addTodo = (newTodoItem) => {
  // 사용자가 생성한 새로운 todo 항목을
  return async (dispatch) => {
    // todoSliceStore에 저장하고
    dispatch(todoActions.add(newTodoItem));

    // Firebase에도 저장한다.
    const url = "https://react-todo-5ddf8-default-rtdb.firebaseio.com/";

    const response = await fetch(`${url}/todo/${newTodoItem.id}.json`, {
      method: "PUT",
      body: JSON.stringify(newTodoItem),
    });

    const json = await response.json();
    console.log(json);
  };
};
export const doneTodo = (doneTodoItem) => {
  // 사용자가 완료한 todo 항목을
  return async (dispatch) => {
    console.log("???????", doneTodoItem);
    // todoSliceStore에 저장하고
    dispatch(todoActions.done(doneTodoItem));

    // Firebase에도 저장한다.
    const url = "https://react-todo-5ddf8-default-rtdb.firebaseio.com/";

    const response = await fetch(`${url}/todo/${doneTodoItem.id}.json`, {
      method: "PUT",
      body: JSON.stringify(doneTodoItem),
    });

    const json = await response.json();
    console.log(json);
  };
};

// 2. Redux Store 생성.
const toolkitStore = configureStore({
  reducer: {
    // slice store에 접근할 이름
    todo: todoSliceStore.reducer,
  },
});

// 3. Slice Store Actions 공유.
export const todoActions = todoSliceStore.actions;

// 4. Provider Component 생성.
export default function ToolkitProvider({ children }) {
  return <Provider store={toolkitStore}>{children}</Provider>;
}
