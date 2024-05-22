import { useCallback, useEffect, useMemo, useState } from "react";
import BoardView from "./BoardView";
import WriteBoardForm from "./WriteBoardForm";
import { getBoards } from "../http/http";
import { useFetch } from "../hooks/useFetch";

let pageNo = 0;

export default function BoardApp({ token, myInfo }) {
  // 선택한 게시글의 ID
  const [selectedBoardId, setSelectedBoardId] = useState();

  const [isWriteMode, setIsWriteMode] = useState(false);

  const [needReload, setNeedReload] = useState();
  // 게시글을 선택한 상태를 구분
  const isSelect = selectedBoardId !== undefined;

  const fetchGetBoard = useCallback(getBoards, [token]);

  // token이나 needReload가 바뀌면 token을 새로 만들어서
  // 새로운 메모리 생성
  const fetchParam = useMemo(() => {
    return { token, needReload };
  }, [token, needReload]);

  const { data, setData } = useFetch(undefined, fetchGetBoard, fetchParam);

  // count: 게시글 수, next: 다음 페이지 값
  const { count, pages, next } = data || {};

  // 게시글 목록
  const { body: boards } = data || {};

  const onRowClickHandler = (rowId) => {
    setSelectedBoardId(rowId);
  };

  const onLoadMoreClickHandler = async () => {
    // 함수 안에서는 fetch를 못쓴다.
    const json = await getBoards({ token, pageNo: ++pageNo });
    setData((prevData) => {
      return {
        ...prevData,
        next: json.next,
        pages: json.pages,
        errors: json.errors,
        count: json.count,
        body: [...prevData.body, ...json.body],
      };
    });
  };

  const onWriteModeClickHandler = () => {
    setIsWriteMode(true);
  };

  return (
    <>
      {/** 토큰이 있고, 게시글을 선택하지 않았을 때 */}
      {token && !isSelect && !isWriteMode && (
        <>
          <div>총 {count} 개의 게시글이 검색되었습니다.</div>
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
              {boards &&
                boards.map((boardItem) => (
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
        </>
      )}
      {/** 토큰이 있고, 게시글을 선택했을 때 */}
      {token && isSelect && !isWriteMode && (
        <BoardView
          selectedBoardId={selectedBoardId}
          setSelectedBoardId={setSelectedBoardId}
          token={token}
          setNeedReload={setNeedReload}
          myInfo={myInfo}
        />
      )}

      {isWriteMode && (
        <WriteBoardForm
          setIsWriteMode={setIsWriteMode}
          token={token}
          setNeedReload={setNeedReload}
        />
      )}

      {!token && <div>로그인이 필요합니다.</div>}
      {token && !isWriteMode && !isSelect && (
        <div className="button-area right-align">
          {
            /** 다음 페이지가 있을 때에만 '더보기' 보여주기 */
            next && <button onClick={onLoadMoreClickHandler}>더보기</button>
          }
          <button onClick={onWriteModeClickHandler}>게시글 등록</button>
        </div>
      )}
    </>
  );
}
