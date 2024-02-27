

function getLocalToken() {
  const token = localStorage.getItem("accessToken") || null;
  return token
}

function setLocalToken(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}

function remoteToken() {
  localStorage.removeItem("accessToken");
}

export { getLocalToken, setLocalToken, remoteToken };
