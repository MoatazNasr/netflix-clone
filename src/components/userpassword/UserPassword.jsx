import React, { useRef, useContext } from "react";
import {GlobalContext} from "../../context/Provider";
import { updateUser } from "../../context/actions/userActions";
import { setErrorMessage } from "../../context/actions/errMessageActions";
import { setSuccessfulMessage } from "../../context/actions/succesfulMessageActions";
const UserPassword = () => {
  const password = useRef();
  const confirmPassword = useRef();
  const {
    userState,
    userDispatch,
    errorMessageState,
    errorMessageDispatch,
    successfulMessageDispatch,
  } = useContext(GlobalContext);
  const handleSubmit = async (e) => {
    setErrorMessage(null, errorMessageDispatch);
    e.preventDefault();
    if (password.current.value === confirmPassword.current.value) {
      updateUser(
        {
          password: password.current.value,
        },
        userState.token,
        userState.id,
        userDispatch,
        successfulMessageDispatch
      );
    } else {
      setErrorMessage("Passwords do not match", errorMessageDispatch);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="settings-form">
      <input
        type="password"
        placeholder="New password"
        required={true}
        minLength={8}
        ref={password}
      />
      <input
        type="password"
        placeholder="Confirm password"
        required={true}
        minLength={8}
        ref={confirmPassword}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default UserPassword;
