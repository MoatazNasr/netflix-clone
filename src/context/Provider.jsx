import React, { createContext, useReducer } from "react";
import user from "./reducers/userReducer";
import wishlist from "./reducers/wishlistReducer";
import movieOrtv from "./reducers/movie-tvReducer";
import errorMessage from "./reducers/errMessageReducer";
import successfulMessage from "./reducers/successfulMessageReducer";
export const GlobalContext = createContext();
const Provider = ({ children }) => {
  const [userState, userDispatch] = useReducer(user, {
    id: null,
    token: null,
    name: null,
    email: null,
    img: null,
  });
  const [wishlistState, wishlistDispatch] = useReducer(wishlist, {
    userID: null,
    movies: [],
  });
  const [movieOrtvState, movieOrtvDispatch] = useReducer(movieOrtv, {
    movieOrtv: "tv",
    movieOrtvID: null,
  });
  const [errorMessageState, errorMessageDispatch] = useReducer(
    errorMessage,
    null
  );
  const [successfulMessageState , successfulMessageDispatch] = useReducer(successfulMessage, null);
  const value = {
    userState,
    userDispatch,
    wishlistState,
    wishlistDispatch,
    movieOrtvState,
    movieOrtvDispatch,
    errorMessageState,
    errorMessageDispatch,
    successfulMessageState,
    successfulMessageDispatch,
  };

  return (
    <>
      <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    </>
  );
};

export default Provider;
