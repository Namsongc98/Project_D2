

function getLocalToken() {
  const token = window.localStorage.getItem("accessToken") || null;
  return token
}

function setLocalToken(accessToken: string) {
  window.localStorage.setItem("accessToken", accessToken);
}

function remoteToken() {
  window.localStorage.removeItem("accessToken");
}

export { getLocalToken, setLocalToken, remoteToken };
