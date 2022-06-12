export const ERROR_MESSAGE = "ERROR_MESSAGE";

export const setErrorMessage = (payload, dispatch) => {
  dispatch({
    type: ERROR_MESSAGE,
    payload,
  });
};
