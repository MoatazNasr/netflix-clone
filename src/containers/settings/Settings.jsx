import React, { useState } from "react";
import "./settings.css";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink } from "react-router-dom";
import UserPassword from "../../components/userpassword/UserPassword";
import UserData from "../../components/userdata/UserData";
const Settings = () => {
  const [userData, setUserData] = useState(true);
  return (
    <main className="settings">
      <NavLink className="links" to={-1}>
        <ArrowBackIcon /> <span>Back</span>
      </NavLink>
      <section className="section-content">
        <ul className="section-content-select">
          <li>
            <button onClick={()=>setUserData(true)}>User Info</button>
          </li>
          <li>
            <button onClick={()=>setUserData(false)}>Password</button>
          </li>
        </ul>
        {!userData ? (<UserPassword/>):(<UserData/>)}
      </section>
    </main>
  );
};

export default Settings;
