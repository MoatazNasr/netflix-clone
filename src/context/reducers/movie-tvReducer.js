import { SET_MOVIE_OR_TV_ID } from "../actions/movie-tvActions";
import { SET_MOVIE_OR_TV } from "../actions/movie-tvActions";
const movieOrtvRed = (state, action) => {
  if (action.type === SET_MOVIE_OR_TV) {
    return { ...state, movieOrtv: action.payload };
  } else if (action.type === SET_MOVIE_OR_TV_ID) {
    return { ...state, movieOrtvID: action.payload };
  } else return state;
};

export default movieOrtvRed;
