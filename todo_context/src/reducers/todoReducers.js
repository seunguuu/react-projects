/**
 * State를 관리하는 새로운 방법 중 하나.
 * State, Context, Reducer
 * Context를 이용해서 State를 관리한다. ==> Context + Reducer(State)
 */
export const todoReducers = (state, action) => {
  const type = action.type;
  if (type === "ADD") {
    return [
      ...state,
      {
        id: state.length,
        idDone: false,
        task: action.payload.task,
        dueDate: action.payload.dueDate,
      },
    ];
  } else if (type === "DONE") {
    const id = action.payload.id;
    return state.map((item) => {
      if (item.id === id) {
        item.isDone = action.payload.isDone;
      }
      return item;
    });
  }

  return state;
};
