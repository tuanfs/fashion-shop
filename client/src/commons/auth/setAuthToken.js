import apiAdmin from "commons/api/apiAdmin";

const setAuthToken = (token) => {
  if (token) {
    apiAdmin.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiAdmin.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
