import { useEffect, useState } from "react";
import BoardView from "./BoardView";
import WriteBoardForm from "./WriteBoardForm";
import ModifyBoardForm from "./ModifyBoardForm";

export default function BoardApp({ token, myInfo }) {
  // 게시글 목록
  const [boards, setBoards] = useState([]);

  // 선택한 게시글의 ID
  const [selectedBoardId, setSelectedBoardId] = useState();

  const [isWriteMode, setIsWriteMode] = useState(false);
  const [isModifyMode, setIsModifyMode] = useState(false);

  const [needReload, setNeedReload] = useState();
  // 게시글을 선택한 상태를 구분
  const isSelect = selectedBoardId !== undefined;

  useEffect(() => {
    // 게시글 불러오기
    const loadBoards = async () => {
      if (!token) {
        // 로그인이 되어있지 않다면 게시글 목록을 초기화해라.
        setBoards([]);
        return;
      }

      const response = await fetch("http://localhost:8080/api/v1/boards", {
        method: "GET",
        // GET 방식에선 body가 없다.
        // Spring에서 beans - security - jwt - JwtAuthenticationFilter에서
        // /api/ 로 시작하는 모든 URL에 Authorization 이라는 키에 토큰이 필요하기 때문
        // 인증을 해야되기 때문에 headers가 필요하다.
        headers: { Authorization: token },
      });

      const json = await response.json();
      console.log(json);
      setBoards(json.body);
    };
    loadBoards();
  }, [token, needReload]);

  const onRowClickHandler = (rowId) => {
    setSelectedBoardId(rowId);
  };

  const onWriteModeClickHandler = () => {
    setIsWriteMode(true);
  };

  return (
    <>
      {/** 토큰이 있고, 게시글을 선택하지 않았을 때 */}
      {token && !isSelect && !isWriteMode && (
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>조회수</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {boards.map((boardItem) => (
              <tr
                key={boardItem.id}
                onClick={() => onRowClickHandler(boardItem.id)}
              >
                <td>{boardItem.id}</td>
                <td>{boardItem.subject}</td>
                <td>{boardItem.memberVO.name}</td>
                <td>{boardItem.viewCnt}</td>
                <td>{boardItem.crtDt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/** 토큰이 있고, 게시글을 선택했을 때 */}
      {token && isSelect && !isWriteMode && (
        <BoardView
          selectedBoardId={selectedBoardId}
          setSelectedBoardId={setSelectedBoardId}
          token={token}
          setNeedReload={setNeedReload}
          myInfo={myInfo}
          setIsModifyMode={setIsModifyMode}
        />
      )}

      {isWriteMode && (
        <WriteBoardForm
          setIsWriteMode={setIsWriteMode}
          token={token}
          setNeedReload={setNeedReload}
        />
      )}

      {isModifyMode && (
        <ModifyBoardForm
          setIsModifyMode={setIsModifyMode}
          token={token}
          setNeedReload={setNeedReload}
          selectedBoardId={selectedBoardId}
        />
      )}

      {!token && <div>로그인이 필요합니다.</div>}
      {token && (
        <div className="button-area right-align">
          <button onClick={onWriteModeClickHandler}>게시글 등록</button>
        </div>
      )}
    </>
  );
}