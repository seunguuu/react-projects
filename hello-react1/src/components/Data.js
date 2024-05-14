export function Data({ textArray }) {
  // textArray의 값 형태
  // ["abc", "def", "abc", "a", "b"]
  // 변환
  //  const divTags = [ <div key="">abc</div>, <div key="">def</div>,
  //  <div key="">abc</div>, <div key="">a</div>, <div key="">b</div> ]
  return (
    <div>
      {textArray.map((text, index) => (
        <div key={index}>{text}</div>
      ))}
    </div>
  );
}
