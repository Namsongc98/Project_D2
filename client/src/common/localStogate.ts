function getLocalToken() {
    const token = window.localStorage.getItem("accessToken");
    if (token) {
        return token;
    } else {
        throw new Error("Không có token");
    }
}
function setLocalToken(accessToken: string) {
    window.localStorage.setItem("accessToken", accessToken);
}

function remoteToken() {
    window.localStorage.removeItem("accessToken");
}

export { getLocalToken, setLocalToken, remoteToken }