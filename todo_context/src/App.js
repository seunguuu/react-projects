import TodoApp from "./components/TodoApp.js";
import { TodoContextProvider } from "./contexts/TodoContext.js";

function App() {
  return (
    <TodoContextProvider>
      <TodoApp />
    </TodoContextProvider>
  );
}

export default App;
