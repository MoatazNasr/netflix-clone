import { publicRequest, userRequest } from "../../utils/backendAjax";
import jwtDecode from "jwt-decode";
import { setErrorMessage } from "./errMessageActions";
import { setSuccessfulMessage } from "./succesfulMessageActions";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const UPDATE_USER = "UPDATE_USER";
export const loginUser = (
  formData,
  userDispatch,
  errorDispatch,
  successfulDispatch
) => {
  publicRequest
    .post("/users/login", formData)
    .then((res) => {
      const data = jwtDecode(res.data);
      setSuccessfulMessage("Welcome", successfulDispatch);
      userDispatch({
        type: LOGIN_USER,
        payload: {
          token: res.data,
          ...data,
        },
      });
    })
    .catch((error) => {
      setErrorMessage("Invalid Credentials", errorDispatch);
    });
};

export const logoutUser = (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
    payload: {
      id: null,
      token: null,
      name: null,
      email: null,
      img: null,
    },
  });
};

export const updateUser = (
  formData,
  token,
  id,
  userDispatch,
  successfulDispatch
) => {
  const api = userRequest(token);
  api.put(`/users/${id}`, formData).then((res) => {
    setSuccessfulMessage("Data is updated", successfulDispatch);
    userDispatch({
      type: UPDATE_USER,
      payload: { ...res.data },
    });
  });
};
