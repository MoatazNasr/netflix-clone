import React, { useContext, useState, useEffect } from "react";
import "./signin.css";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context/Provider";
import { loginUser } from "../../context/actions/userActions";
import { getWishlist } from "../../context/actions/wishlistActions";
import { useNavigate } from "react-router-dom";
import { setErrorMessage } from "../../context/actions/errMessageActions";
const Signin = () => {
  const {
    userState,
    userDispatch,
    wishlistDispatch,
    wishlistState,
    errorMessageState,
    errorMessageDispatch,
    successfulMessageDispatch,
  } = useContext(GlobalContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null, errorMessageDispatch);
    loginUser({ email, password }, userDispatch, errorMessageDispatch,successfulMessageDispatch);
    setLoading(true);
  };
  useEffect(() => {
    if (userState.id) {
      getWishlist(
        { id: userState.id, token: userState.token },
        wishlistDispatch
      );
    } else {
      setLoading(false);
    }
  }, [userState,errorMessageState]);
  useEffect(() => {
    if (userState.id && wishlistState.userID) navigate("/");
  }, [userState, wishlistState]);
  return (
    <section className="signin">
      <div className="signin-header">
        <img
          src="/assets/Netflix_2015_logo.svg"
          alt="logo"
          className="signin-logo"
        />
      </div>
      <div className="signin-content">
        <h2 className="signin-form-title">Sign in</h2>
        <form className="signin-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            aria-label='signin-email'
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            aria-label='signin-password'
            required={true}
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" aria-label="signin-button">{loading ? "Loading..." : "Sign in"}</button>
        </form>
        <p className="fs-400">
          New to Netflix?{" "}
          <NavLink className="links" to="/register" aria-label="to-register">
            Sign up now.
          </NavLink>
        </p>
        <p></p>
      </div>
    </section>
  );
};

export default Signin;
