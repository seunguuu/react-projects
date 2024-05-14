export function Table({ textArray }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {textArray.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
