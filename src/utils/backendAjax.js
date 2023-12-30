import axios from "axios";

const BASEURL = "https://netflix-backend-njej.onrender.com/api";

export const publicRequest = axios.create({
  baseURL: BASEURL,
});

export const userRequest = (token) => {
  return axios.create({
    baseURL: BASEURL,
    headers: { authorization:`Bearer ${token}`},
  });
};
