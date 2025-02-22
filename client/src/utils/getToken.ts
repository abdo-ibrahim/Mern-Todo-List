import Cookies from "js-cookie";

const getToken = () => {
  let token = Cookies.get("token");
  if (token) {
    token = token.replace(/^s:/, "");
  }
  return token;
};

export default getToken;
