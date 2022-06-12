import axios from "axios";

const BASEURL = "http://localhost:2000/api";

export const publicRequest = axios.create({
  baseURL: BASEURL,
});

export const userRequest = (token) => {
  return axios.create({
    baseURL: BASEURL,
    headers: { authorization:`Bearer ${token}`},
  });
};
