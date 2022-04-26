import React from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";

import "./moviecard.css";
const Card = () => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-header">
          <img src="/assets/20201225201649583970.jpg" alt="card" />
        </div>
        <div className="card-body">
          <div className="card-body-buttons">
            <span>
              {" "}
              <PlayCircleOutlineOutlinedIcon fontSize="" />
            </span>
            <span>
              {" "}
              <LocalFireDepartmentOutlinedIcon fontSize="" />
            </span>
            <span>
              {" "}
              <AddCircleOutlineOutlinedIcon fontSize="" />
            </span>
          </div>
          <div className="card-body-desc">
            <p className="card-body-desc-date">
              <span>1 hour</span>
              <span>19 mins</span>
              <span>+16</span>
              <span>2000</span>
            </p>
            <p className="card-body-desc-text">
              A blind lawyer by day, vigilante by night. Matt Murdock fights the
              crime of New York as Daredevil. Edit Report This. As a child Matt.
            </p>
          </div>
        </div>
        <div className="card-footer">
          <span>Action</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
