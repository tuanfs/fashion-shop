import apiUser from "commons/api/apiUser";

const setAuthTokenUser = (token) => {
  if (token) {
    apiUser.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiUser.defaults.headers.common["Authorization"];
  }
};

export default setAuthTokenUser;
