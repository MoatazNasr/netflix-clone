import React, { useState, useRef ,useContext} from "react";
import "./register.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { publicRequest } from "../../utils/backendAjax";
import { useNavigate } from "react-router-dom";
import { setSuccessfulMessage } from "../../context/actions/succesfulMessageActions";
import { GlobalContext } from "../../context/Provider";
const RegisterHome = () => {
  const {successfulMessageDispatch} = useContext(GlobalContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [age, setAge] = useState();
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef();
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pxgvk1hf");
    const res = await axios.post(
      `${process.env.REACT_APP_CLOUDINARY_URL}`,
      data
    );
    setImg(res.data.secure_url);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await publicRequest.post("/users/register", {
      email: email,
      password: password,
      username: username,
      age: age,
      img: img,
    });
    publicRequest
      .post("/wishlists", { userID: data, movies: [] })
      .then(res => {
        setSuccessfulMessage('Registered successfully!',successfulMessageDispatch)
        navigate("/signin");
        setLoading(false);
      });
  };
  const handleEmailExistence = (e) => {
    e.preventDefault();
    if (inputRef.current.value) {
      publicRequest
        .get(`/users/email/${inputRef.current.value}`)
        .then((res) => {
          if (res.status === 200) navigate("/signin");
          else setEmail(inputRef.current.value);
        });
    }
  };
  return (
    <section className={!email ? "register1" : "register2"}>
      {!email ? (
        <>
          <header className="register1-header">
            <img
              src="/assets/Netflix_2015_logo.svg"
              alt="logo"
              className="register1-logo"
            />
            <NavLink to="/signin" className="links register1-link">
              Sign In
            </NavLink>
          </header>
          <main className="register1-content">
            <h1 className="register1-content-title">
              Unlimited movies, TV <br /> shows, and more.
            </h1>
            <h3 className="register1-content-subtitle">
              Watch anywhere. Cancel anytime
            </h3>
            <p>
              Ready to watch? Enter your email to create or restart your
              membership
            </p>

            <form
              onSubmit={handleEmailExistence}
              className="register1-content-email"
            >
              <input
                type="email"
                placeholder="Email"
                required={true}
                ref={inputRef}
              />
              <button type="submit">Get Started</button>
            </form>
          </main>
        </>
      ) : (
        <>
          <header className="register2-header">
            <img
              src="/assets/Netflix_2015_logo.svg"
              alt="logo"
              className="register2-logo"
            />
            <button className="register2-btn" onClick={() => setEmail()}>
              Cancel
            </button>
          </header>
          <main className="register2-content">
            <form className="register2-content-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                required={true}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required={true}
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                type="number"
                placeholder="Age"
                min={12}
                required={true}
                onChange={(e) => setAge(e.target.value)}
              />
              <label htmlFor="file-img">Profile Picture</label>
              <input
                type="file"
                onChange={uploadImage}
                required={true}
                id="file-img"
              />
              <button type="submit" disabled={!img}>
                {loading ? "Loading..." : "Register"}
              </button>
            </form>
          </main>
        </>
      )}
    </section>
  );
};

export default RegisterHome;
