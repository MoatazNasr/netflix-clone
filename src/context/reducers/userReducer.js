import { LOGOUT_USER } from "../actions/userActions";
import { LOGIN_USER } from "../actions/userActions";
import { UPDATE_USER } from "../actions/userActions";
const user = (state, action) => {
  if (action.type === LOGIN_USER) {
    return action.payload;
  } else if (action.type === LOGOUT_USER) {
    return action.payload;
  } else if (action.type === UPDATE_USER) {
    return { ...state, ...action.payload };
  } else return state;
};

export default user;
