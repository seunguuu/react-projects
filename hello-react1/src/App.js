import { Input } from "./components/Input";
import { Data } from "./components/Data";
import { useState } from "react";

function App() {
  const [textArray, setTextArray] = useState([]);

  return (
    <div>
      <Input setTextArray={setTextArray} />
      <Data textArray={textArray} />
    </div>
  );
}

export default App;
