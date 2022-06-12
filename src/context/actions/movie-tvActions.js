export const SET_MOVIE_OR_TV_ID = "SET_MOVIE_TV_ID";
export const SET_MOVIE_OR_TV = "SET_MOVIE_TV_TYPE";

export const setMovieOrTv = (type, dispatch) => {
  dispatch({
    type: SET_MOVIE_OR_TV,
    payload: type,
  });
};

export const setMovieOrTvID = (id, dispatch) => {
  dispatch({
    type: SET_MOVIE_OR_TV_ID,
    payload: id,
  });
};
