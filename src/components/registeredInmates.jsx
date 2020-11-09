import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { FiChevronLeft } from "react-icons/fi";
import * as inmate from "../services/inmateService";
import welcomePageImage from "../assets/img/sample/photo/support-notes-colour-800px.png";
import loaderIcon from "../assets/img/logo-icon.png";
import $ from "jquery";

class RegisteredInmates extends Component {
  state = { inmateData: [] };
  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  populateInmates = async () => {
    try {
      const { data } = await inmate.getInmateRecord();
      console.log(data);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast(error.response.data);
      }
    }
  };
  async componentDidMount() {
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
    const inmateData = await this.populateInmates();
    this.setState({ inmateData });
  }

  render() {
    const { inmateData } = this.state;
    const contentType = "data:image/jpeg;base64,";
    return (
      <div>
        <div id="loader">
          <img src={loaderIcon} alt="icon" className="loading-icon" />
        </div>
        <div className="appHeader no-border">
          <div className="left">
            <NavLink to="/welcomePage" className="headerButton goBack">
              <FiChevronLeft size={30}></FiChevronLeft>
            </NavLink>
          </div>
          <div className="pageTitle">Police App</div>
          <div className="right">
            <NavLink to="/LogOut" className="headerButton">
              LogOut
            </NavLink>
          </div>
        </div>
        <div className="section mt-2 text-center">
          <h1>Registered Inmates</h1>
        </div>
        <div className="section mt-2">
          <div className="section-title"></div>
          <div className="transactions">
            {inmateData.map((inmate) => (
              <a href="app-transaction-detail.html" className="item">
                <div className="detail">
                  <img
                    src={`${contentType} ${this.arrayBufferToBase64(
                      inmate.filePath.data.data
                    )}`}
                    alt="img"
                    className="image-block imaged w48"
                  />
                  <div>
                    <strong>{`${inmate.firstName} ${inmate.lastName}`}</strong>
                    <p>{inmate.offence}</p>
                  </div>
                </div>
                <div className="right">
                  <div className="price text-danger">{inmate.dateAdmitted}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default RegisteredInmates;
