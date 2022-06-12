import { SUCCESSFUL_MESSAGE } from "../actions/succesfulMessageActions";

const successfulMessage = (state, action) => {
  if (action.type === SUCCESSFUL_MESSAGE) {
    return action.payload;
  }
  else return state;
};
export default successfulMessage;
