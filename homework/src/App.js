import { Input } from "./components/Input";
import { Table } from "./components/Table";
import { useState } from "react";

function App() {
  const [textArray, setTextArray] = useState([]);

  return (
    <div>
      <Input setTextArray={setTextArray} />
      <Table textArray={textArray} />
    </div>
  );
}

export default App;
