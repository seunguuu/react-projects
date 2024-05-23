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
    // state: 변경 가능한 State, action: state를 변경시킬 값
    add(state, action) {
      console.log("todo > add: ", action);
      const payload = action.payload;

      // State를 직접 변경한다.
      state.push({
        id: state.length,
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
