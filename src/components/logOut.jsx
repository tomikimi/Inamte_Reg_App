import React, { Component } from "react";
import loaderIcon from "../assets/img/logo-icon.png";
import $ from "jquery";

class LogOut extends Component {
  state = {};

  componentDidMount() {
    localStorage.removeItem("token");
    $(document).ready(function () {
      setTimeout(() => {
        $("#loader").fadeToggle(250);
      }, 800);
    });

    document.getElementById("body").className = "bg-light";
    window.location = "/";
  }

  render() {
    return (
      <div>
        <div id="loader">
          <img src={loaderIcon} alt="icon" className="loading-icon" />
        </div>
        ;
      </div>
    );
  }
}

export default LogOut;
