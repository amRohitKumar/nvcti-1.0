import axios from "axios";

const customFetch = axios.create({
  baseURL: "http://localhost:8080", // server url
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:8080", // server url
    "Content-Type": "application/json",
  },
});

export default customFetch;