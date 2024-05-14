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
          <tr>
            {textArray.map((data, index) => (
              <div>
                <td key={index}>{data.name}</td>
                <td key={index}>{data.age}</td>
              </div>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
