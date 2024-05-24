import { useRef } from "react";
import { updateBoards } from "../../http/http";

export default function ModifyBoardForm({
  boardItem,
  token,
  setIsModifyMode,
  setNeedReload,
  setNeedReloadDetail,
}) {
  const subjectRef = useRef();
  const contentRef = useRef();
  const fileRef = useRef();

  const onCancelClickHandler = () => {
    setIsModifyMode(false);
  };

  const onModifyClickHandler = async () => {
    const subject = subjectRef.current.value;
    const content = contentRef.current.value;
    const file = fileRef.current.files[0];

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("content", content);
    formData.append("file", file);

    const json = await updateBoards(boardItem, token, formData);

    console.log(json);

    if (json.errors) {
      json.errors.forEach((error) => {
        alert(error);
      });
    } else if (json.body) {
      setIsModifyMode(false);
      setNeedReload(Math.random());
      setNeedReloadDetail(Math.random());
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="subject">제목</label>
        <input
          type="text"
          id="subject"
          ref={subjectRef}
          defaultValue={boardItem.subject}
        />
      </div>
      <div>
        <label htmlFor="file">첨부파일</label>
        <input type="file" id="file" ref={fileRef} />
      </div>
      <div>
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          ref={contentRef}
          defaultValue={boardItem.content}
        ></textarea>
      </div>
      <div className="button-area right-align">
        <button onClick={onCancelClickHandler}>취소</button>
        <button onClick={onModifyClickHandler}>수정</button>
      </div>
    </div>
  );
}
