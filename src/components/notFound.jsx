import React, { Component } from "react";
import loaderIcon from "../assets/img/logo-icon.png";
import { NavLink } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import $ from "jquery";

class NotFound extends Component {
  //   componentDidMount() {
  //     $(document).ready(function () {
  //       setTimeout(() => {
  //         $("#loader").fadeToggle(250);
  //       }, 800);
  //     });
  //   }

  render() {
    console.log(this.props);
    return (
      <>
        <div id="loader">
          <img src={loaderIcon} alt="icon" className="loading-icon" />
        </div>
        <div className="appHeader no-border">
          {/* <div className="left">
            <NavLink to={`/RegistrationPage`} className="headerButton goBack">
              <FiChevronLeft size={30}></FiChevronLeft>
            </NavLink>
          </div> */}
          <div className="pageTitle">Police App</div>
        </div>
        <div className="section">
          <div className="splash-page mt-5 mb-5">
            <h1>404</h1>
            <h2 className="mb-2">Page not found!</h2>
            <p>Information Specified does not exist.</p>
          </div>
        </div>
      </>
    );
  }
}

export default NotFound;
