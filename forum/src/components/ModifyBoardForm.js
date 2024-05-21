import { useEffect, useRef, useState } from "react";

export default function ModifyBoardForm({
  setIsModifyMode,
  token,
  setNeedReload,
  selectedBoardId,
}) {
  const [modifyItem, setModifyItem] = useState();

  const modifySubjectRef = useRef();
  const modifyFileRef = useRef();
  const modifyContentRef = useRef();

  useEffect(() => {
    const loadBoards = async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/boards/${selectedBoardId}`,
        { method: "GET", headers: { Authorization: token } }
      );

      const json = await response.json();
      setModifyItem(json.body);
    };
    loadBoards();
  }, [selectedBoardId, token]);

  const onCancelClickHandler = () => {
    setIsModifyMode(false);
  };

  const onModifyClickHandler = async () => {
    const modifySubject = modifySubjectRef.current.value;
    const modifyContent = modifyContentRef.current.value;
    const modifyFile = modifyFileRef.current.files[0];

    const formData = new FormData();
    formData.append("subject", modifySubject);
    formData.append("content", modifyContent);
    formData.append("file", modifyFile);

    const response = await fetch(
      `http://localhost:8080/api/v1/boards/${selectedBoardId}`,
      { method: "PUT", headers: { Authorization: token }, body: formData }
    );

    const json = await response.json();
    console.log(json);

    setIsModifyMode(false);
    setNeedReload(Math.random());
  };

  return (
    <div>
      {!modifyItem && <div>데이터를 불러오는 중입니다.</div>}
      {modifyItem && (
        <div>
          <div>
            <label htmlFor="subject">제목</label>
            <input
              type="text"
              id="subject"
              ref={modifySubjectRef}
              value={modifyItem.subject}
            />
          </div>

          <div>
            <label htmlFor="file">첨부파일</label>
            <input type="file" id="file" ref={modifyFileRef} />
            {modifyItem.originFileName && (
              <div>현재 업로드된 파일: {modifyItem.originFileName}</div>
            )}
          </div>

          <div>
            <label htmlFor="content">내용</label>
            <textarea id="content" ref={modifyContentRef}>
              {modifyItem.content}
            </textarea>
          </div>
        </div>
      )}

      <div className="button-area right-align">
        <button onClick={onCancelClickHandler}>취소</button>
        <button onClick={onModifyClickHandler}>수정</button>
      </div>
    </div>
  );
}
