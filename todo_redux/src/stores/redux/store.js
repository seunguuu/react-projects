import { Provider } from "react-redux";
// createStore 가 Deprecated.
import { createStore } from "redux";

// 1. React redux reducer 생성.
// Redux의 state를 변경하는 주체.
// state의 초기값을 할당해줘야 한다.
function reduxReducer(state = [], action) {
  // action: { type, payload }

  const { type, payload } = action;
  if (type === "ADD-TODO") {
    return [
      ...state,
      {
        id: state.length,
        idDone: false,
        task: payload.task,
        dueDate: payload.dueDate,
      },
    ];
  } else if (type === "DONE") {
    return state.map((todo) => {
      if (todo.id === payload.id) {
        todo.isDone = payload.isDone;
      }
      return { ...todo };
    });
  }

  return state;
}

// 2. React redux reducer를 이용하는 Redux Store 생성.
function reduxStore() {
  return createStore(reduxReducer);
}

// 3. Redux Store를 제공할 Redux Provider 생성.
export default function ReduxProvider({ children }) {
  // 3-1. Redux Store 객체 생성.
  const reduxStoreObject = reduxStore();

  // 3-2. Provider 생성.
  return <Provider store={reduxStoreObject}>{children}</Provider>;
}
