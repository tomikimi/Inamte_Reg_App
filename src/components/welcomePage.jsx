import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import { FiChevronLeft } from "react-icons/fi";
import welcomePageImage from "../assets/img/sample/photo/support-notes-colour-800px.png";
import loaderIcon from "../assets/img/logo-icon.png";
import $ from "jquery";

class WelcomePage extends Component {
  state = {};
  componentDidMount() {
    const token = localStorage.getItem("token");
    $(document).ready(function () {
      setTimeout(() => {
        $("#loader").fadeToggle(250);
      }, 800);
    });
    if (!token) {
      window.location = "/";
    }
    document.getElementById("body").className = "bg-light";
  }
  render() {
    return (
      <div>
        <div id="loader">
          <img src={loaderIcon} alt="icon" className="loading-icon" />
        </div>
        <div className="appHeader no-border">
          <div className="left">
            <NavLink to="/" className="headerButton goBack">
              <FiChevronLeft size={30}></FiChevronLeft>
            </NavLink>
          </div>
          <div className="pageTitle">Start Up</div>
          <div className="right">
            <NavLink to="/LogOut" className="headerButton">
              LogOut
            </NavLink>
          </div>
        </div>
        <div id="appCapsule">
          <div className="section">
            <div className="splash-page mt-5 mb-5">
              <div className="mb-3">
                <img
                  src={welcomePageImage}
                  alt="image"
                  className="imaged w-50 square"
                />
              </div>
              <h2 className="mb-2">Welcome back again!</h2>
              <p>Please kindly select an action you would like to perform</p>
            </div>
          </div>

          <div className="fixed-bar">
            <div className="row">
              <div className="col-6">
                <NavLink
                  to="/RegisteredInmates"
                  className="btn btn-lg btn-secondary btn-block"
                >
                  View Inmates
                </NavLink>
              </div>
              <div className="col-6">
                <NavLink
                  to="/RegistrationPage"
                  className="btn btn-lg btn-primary btn-block"
                >
                  Register Inmates
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomePage;
