import { useEffect, useState } from "react";
import ModifyBoardForm from "./ModifyBoardForm";
import { deleteBoards, viewBoards } from "../http/http";

export default function BoardView({
  selectedBoardId,
  setSelectedBoardId,
  token,
  setNeedReload,
  myInfo,
}) {
  const [boardItem, setBoardItem] = useState();
  const [isModifyMode, setIsModifyMode] = useState();
  const [needReloadDetail, setNeedReloadDetail] = useState();

  const onModifyModeClickHandler = () => {
    setIsModifyMode(true);
  };

  const onDeleteClickHandler = async () => {
    const json = await deleteBoards(token, boardItem);

    if (json.body) {
      // 삭제 성공!
      // 목록에서 컴포넌트를 노출.
      setSelectedBoardId(undefined);
      // 삭제했을때 true를 주면, 게시글을 여러개 삭제했을 때에도
      // 똑같이 true값을 주게 되는데
      // 이것 보다는 삭제를 할때 매번 새로운 난수를 만들어서
      // State가 바뀌었다고 판단하게 해서 게시글 목록을 Reload하기 위함
      setNeedReload(Math.random());
    } else {
      // 삭제실패!!
      // 실패한 사유를 알려줘야 한다.
      console.log(json);
      alert(json.errors);
    }
  };

  const onViewListClickHandler = () => {
    setSelectedBoardId(undefined);
    setNeedReload(Math.random());
  };

  useEffect(() => {
    // props로 받아온 것을 useEffect 내부에서 사용할때
    // 사용되는 변수를 [] 안에 넣어줘야 한다.
    const loadBoard = async () => {
      const json = await viewBoards(token, selectedBoardId);

      console.log(json);
      setBoardItem(json.body);
    };
    loadBoard();
  }, [selectedBoardId, token, needReloadDetail]);

  return (
    <div>
      {!boardItem && <div>데이터를 불러오는 중입니다.</div>}
      {boardItem && !isModifyMode && (
        <div>
          <div>
            작성자: {boardItem.memberVO.name}({boardItem.email})
          </div>
          <div>게시글 작성자 이메일: {boardItem.email}</div>
          <div>조회수: {boardItem.viewCnt}</div>
          <div>작성일: {boardItem.crtDt}</div>
          {boardItem.mdfyDt && <div>수정일: {boardItem.mdfyDt}</div>}
          {boardItem.originFileName && (
            <div>첨부파일: {boardItem.originFileName}</div>
          )}
          <div>게시글 내용: {boardItem.content}</div>
        </div>
      )}

      {isModifyMode && (
        <ModifyBoardForm
          boardItem={boardItem}
          token={token}
          setIsModifyMode={setIsModifyMode}
          setNeedReload={setNeedReload}
          setNeedReloadDetail={setNeedReloadDetail}
        />
      )}

      <div className="button-area right-align">
        {
          /** 로그인한 사용자가 있고
           *   (로그인한 사용자의 이메일과 게시글을 작성한 사람이 같거나 관리자일 경우
           *   삭제 버튼이 보이도록 한다.
           * */
          !isModifyMode &&
            myInfo &&
            boardItem &&
            (myInfo.email === boardItem.email || myInfo.adminYn === "Y") && (
              <>
                <button onClick={onModifyModeClickHandler}>수정</button>
                <button onClick={onDeleteClickHandler}>삭제</button>
              </>
            )
        }
        {!isModifyMode && (
          <button onClick={onViewListClickHandler}>목록보기</button>
        )}
      </div>
    </div>
  );
}
