import { userRequest } from "../../utils/backendAjax";
import { setSuccessfulMessage } from "./succesfulMessageActions";

export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";
export const GET_WISHLIST = "GET_WISHLIST";
export const REMOVE_WISHLIST = "REMOVE_WISHLIST";

export const getWishlist = async ({ id, token }, dispatch) => {
  const api = userRequest(token);
  const res = await api.get(`/wishlists/${id}`);
  dispatch({
    type: GET_WISHLIST,
    payload: {
      ...res.data,
    },
  });
};
export const addToWishlist = (
  { token, state, movieID, type },
  wishlistDispatch,
  successfulDispatch
) => {
  const movies = state.movies.map((item) => item);
  movies.push({ movieID, type });
  const api = userRequest(token);
  api
    .put(`/wishlists/${state._id}`, {
      movies,
    })
    .then(() => {
      setSuccessfulMessage("Added to wishlist", successfulDispatch);
      wishlistDispatch({
        type: ADD_TO_WISHLIST,
        payload: {
          movieID,
          type,
        },
      });
    });
};
export const removeFromWishlist = (
  { token, movieID, wishlistID },
  dispatch,
  successfulDispatch
) => {
  const api = userRequest(token);
  api.delete(`/wishlists/${wishlistID}/${movieID}`).then(() => {
    setSuccessfulMessage("Removed from wishlist", successfulDispatch);

    dispatch({ type: REMOVE_FROM_WISHLIST, payload: movieID });
  });
};
export const removeWishlist = async (dispatch) => {
  dispatch({
    type: REMOVE_WISHLIST,
    payload: {
      userID: null,
      wishlist: [],
    },
  });
};
