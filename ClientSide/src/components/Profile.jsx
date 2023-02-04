import React, { useContext } from "react";
import "../css/profile.css";
import { successMsg } from "../services/feedbackService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Profile() {
  const userDetails = useContext(UserContext);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="content-profile-page mt-5 mb-5">
          <div className="profile-user-page profileCard">
            <div className="img-user-profile">
              <img className="profile-bgHome" src="profilebanner.jpg" />
              <img className="avatar" src="userImg.jpg" alt="jofpin" />
            </div>
            <div className="user-profile-data">
              <h5 className="text-center mt-3">Logged in As:</h5>
              <h1 className="boldTitle text-center mb-4">
                <span className="_coloredSubTitle">{userDetails.name}</span>{" "}
                {userDetails.isAdmin ? (
                  <i
                    className="fa-solid fa-certificate"
                    style={{ color: "#00aced" }}
                  ></i>
                ) : null}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
