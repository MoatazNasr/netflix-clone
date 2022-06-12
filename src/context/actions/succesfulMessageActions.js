export const SUCCESSFUL_MESSAGE = 'SUCCESSFUL_MESSAGE';


export const setSuccessfulMessage = (payload,dispatch) => { 
    dispatch({
        type: SUCCESSFUL_MESSAGE,
        payload,
    });
}