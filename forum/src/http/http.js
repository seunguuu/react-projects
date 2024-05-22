export const loadMyData = async ({ token }) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch("http://localhost:8080/api/v1/member", {
    method: "GET",
    headers: { Authorization: token },
  });

  const json = await response.json();

  return json;
};

export const login = async (email, password) => {
  const response = await fetch("http://localhost:8080/auth/token", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  const json = await response.json();

  return json;
};

export const getBoards = async ({ token, pageNo = 0 }) => {
  if (!token) {
    return undefined;
  }

  const response = await fetch(
    `http://localhost:8080/api/v1/boards?pageNo=${pageNo}`,
    {
      method: "GET",
      // GET 방식에선 body가 없다.
      // Spring에서 beans - security - jwt - JwtAuthenticationFilter에서
      // /api/ 로 시작하는 모든 URL에 Authorization 이라는 키에 토큰이 필요하기 때문
      // 인증을 해야되기 때문에 headers가 필요하다.
      headers: { Authorization: token },
    }
  );

  const json = await response.json();

  return json;
};

export const deleteBoards = async (token, boardItem) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/boards/${boardItem.id}`,
    {
      method: "DELETE",
      headers: { Authorization: token },
    }
  );

  const json = await response.json();

  return json;
};

export const viewBoards = async ({ token, selectedBoardId }) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/boards/${selectedBoardId}`,
    { method: "GET", headers: { Authorization: token } }
  );

  const json = await response.json();

  return json;
};

export const writeBoards = async (token, formData) => {
  const response = await fetch("http://localhost:8080/api/v1/boards", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  const json = await response.json();

  return json;
};

export const updateBoards = async (boardItem, token, formData) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/boards/${boardItem.id}`,
    { method: "PUT", headers: { Authorization: token }, body: formData }
  );

  const json = await response.json();

  return json;
};
