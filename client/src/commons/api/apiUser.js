import axios from "axios";

const url =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://infinite-fjord-72124.herokuapp.com/api";
export default axios.create({
  baseURL: url,
});
