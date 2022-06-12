import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./GlobalStyles.css";
import Home from "./containers/home/Home";
import Video from "./containers/video/Video";
import RegisterHome from "./containers/register/RegisterHome";
import Signin from "./containers/signin/Signin";
import MyList from "./containers/mylist/MyList";
import Settings from "./containers/settings/Settings";
import { GlobalContext } from "./context/Provider";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { setErrorMessage } from "./context/actions/errMessageActions";
import { setSuccessfulMessage } from "./context/actions/succesfulMessageActions";
function App() {
  const {
    userState,
    wishlistState,
    errorMessageState,
    errorMessageDispatch,
    successfulMessageState,
    successfulMessageDispatch,
  } = useContext(GlobalContext);
  const [closeStatusMessage, setCloseStatusMessage] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userState.id) {
      navigate("/signin");
    }
  }, [userState, wishlistState]);
  useEffect(() => {
    if (closeStatusMessage) {
      setTimeout(() => {
        setErrorMessage(null, errorMessageDispatch);
        setSuccessfulMessage(null, successfulMessageDispatch);
      }, 750);
    }
  }, [closeStatusMessage]);
  useEffect(() => {
    if (errorMessageState || successfulMessageState) {
      setCloseStatusMessage(false);
    }
  }, [errorMessageState, successfulMessageState]);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<RegisterHome />} />
        <Route path="/video/:id" element={<Video />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      {errorMessageState && (
        <div
          className={`status-message error ${
            !closeStatusMessage ? "status-message-show" : "status-message-hide "
          }`}
        >
          <span>{errorMessageState}</span>
          <button onClick={() => setCloseStatusMessage(true)}>
            <CloseIcon />
          </button>
        </div>
      )}
      {successfulMessageState && (
        <div
          className={`status-message successful ${
            !closeStatusMessage ? "status-message-show" : "status-message-hide "
          }`}
        >
          <span>{successfulMessageState}</span>
          <button onClick={() => setCloseStatusMessage(true)}>
            <CloseIcon />
          </button>
        </div>
      )}
    </>
  );
}

export default App;
