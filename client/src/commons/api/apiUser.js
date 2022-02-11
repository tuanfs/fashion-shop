import axios from "axios";

const url =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://whispering-citadel-96671.herokuapp.com/api";

export default axios.create({
  baseURL: url,
});

// http://localhost:5000/api
