import React, { useState, useEffect, useContext } from "react";
import uploadImage from "../../utils/uploadImage";
import { GlobalContext } from "../../context/Provider";
import { updateUser } from "../../context/actions/userActions";
import "./userdata.css";
const UserData = () => {
  const { userState, userDispatch ,successfulMessageDispatch} = useContext(GlobalContext);
  const { username, email, img, age } = userState;
  const [emailValue, setEmail] = useState(email);
  const [usernameValue, setUsername] = useState(username);
  const [ageValue, setAge] = useState(age);
  const [imgValue, setImg] = useState(img);
  const [loading, setLoading] = useState(false);
  const handleImage = (e) => {
    const imagePromise = uploadImage(e);
    imagePromise.then((res) => {
      setImg(res.data.secure_url);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUser(
      {
        username: usernameValue !== "" ? usernameValue : userState.username,
        email: emailValue !== "" ? emailValue : userState.email,
        img: imgValue !== "" ? imgValue : userState.img,
        age: ageValue !== "" ? ageValue : userState.age,
      },
      userState.token,
      userState.id,
      userDispatch,
      successfulMessageDispatch
    );
  };
  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        value={usernameValue}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        value={emailValue}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="age">Age</label>
      <input
        id="age"
        type="number"
        value={ageValue}
        min={12}
        onChange={(e) => setAge(e.target.value)}
      />
      <label htmlFor="file-img">Profile Picture</label>
      <img src={imgValue} className="userdata-image" />
      <input type="file" onChange={handleImage} id="file-img" />
      <button type="submit">{loading ? "Loading..." : "Update"}</button>
    </form>
  );
};

export default UserData;
