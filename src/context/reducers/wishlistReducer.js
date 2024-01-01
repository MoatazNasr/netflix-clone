import { GET_WISHLIST } from "../actions/wishlistActions";
import { ADD_TO_WISHLIST } from "../actions/wishlistActions";
import { REMOVE_FROM_WISHLIST } from "../actions/wishlistActions";
import { REMOVE_WISHLIST } from "../actions/wishlistActions";
const wishlist = (state, action) => {
  if (action.type === GET_WISHLIST) {
    return action.payload;
  } else if (action.type === ADD_TO_WISHLIST) {
    return { ...state, movies: [...state.movies,action.payload] };
  } else if (action.type === REMOVE_FROM_WISHLIST) {
    return {
      ...state,
      movies: state.movies.filter((item) => item.movieID !== action.payload),
    };
  } else if (action.type === REMOVE_WISHLIST) {
    return action.payload;
  } else return state;
};

export default wishlist;
