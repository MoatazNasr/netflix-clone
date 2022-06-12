import { ERROR_MESSAGE } from "../actions/errMessageActions";

const errMessage = (state, action) => {
  if (action.type === ERROR_MESSAGE) {
    return action.payload;
  }
  else return state;

};
export default errMessage;
