import axios from "axios";

const BASEURL = "https://netflix-clone-backend-production-00d6.up.railway.app/api";

export const publicRequest = axios.create({
  baseURL: BASEURL,
});

export const userRequest = (token) => {
  return axios.create({
    baseURL: BASEURL,
    headers: { authorization:`Bearer ${token}`},
  });
};
