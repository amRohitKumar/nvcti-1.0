import axios from "axios";

const customFetch = axios.create({
  baseURL: "http://", // server url
  headers: {
    "Access-Control-Allow-Origin": "", // server url
    "Content-Type": "application/json",
  },
});

export default customFetch;