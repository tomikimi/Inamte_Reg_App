import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { FiChevronLeft, FiCamera } from "react-icons/fi";
import * as inmate from "../services/inmateService";
import Form from "../common/form";
import uploadPreviewImg from "../assets/img/sample/avatar/avatar1.jpg";
import loaderIcon from "../assets/img/logo-icon.png";
import $ from "jquery";

class RegistrationPage extends Form {
  state = {
    data: {
      firstName: "",
      middleName: "",
      lastName: "",
      sex: "",
      dateOfBirth: "",
      nationality: "",
      stateOfOrigin: "",
      religion: "",
      offence: "",
      judgement: "",
      address: "",
      dateAdmitted: "",
      nextOfKin: "",
      nextOfKinAddress: "",
    },
    errors: {},
    gender: [
      { id: "Male", name: "Male" },
      { id: "Female", name: "Female" },
    ],
    religion: [
      { id: "Christian", name: "Christian" },
      { id: "Islam", name: "Islam" },
      { id: "none", name: "none" },
    ],
    file: "",
    previewSrc: "",
    isPreviewAvailable: false,
  };
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
  schema = {
    firstName: Joi.string().required().label("FirstName"),
    middleName: Joi.string().required().label("MiddleName"),
    lastName: Joi.string().required().label("LastName"),
    sex: Joi.string().required().label("Sex"),
    dateOfBirth: Joi.string().required().label("D.O.B"),
    nationality: Joi.string().required().label("Nationality"),
    stateOfOrigin: Joi.string().required().label("State Of Origin"),
    religion: Joi.string().required().label("Religion"),
    offence: Joi.string().required().label("Offence"),
    judgement: Joi.string().required().label("Judgement"),
    address: Joi.string().required().label("Address"),
    dateAdmitted: Joi.string().required().label("Date Admitted"),
    nextOfKin: Joi.string().required().label("Next of Kin"),
    nextOfKinAddress: Joi.string().required().label("Next of Kin Address"),
  };

  handleImageChange = (event) => {
    const file = event.target.files[0];
    const previewSrc = URL.createObjectURL(event.target.files[0]);
    const isPreviewAvailable = event.target.files[0].name.match(
      /\.(jpeg|jpg|png)$/
    );
    this.setState({ file, previewSrc, isPreviewAvailable });
  };

  doSubmit = async () => {
    try {
      const { file } = this.state;
      const {
        firstName,
        middleName,
        lastName,
        sex,
        dateOfBirth,
        nationality,
        stateOfOrigin,
        religion,
        offence,
        judgement,
        address,
        dateAdmitted,
        nextOfKin,
        nextOfKinAddress,
      } = this.state.data;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("middleName", middleName);
        formData.append("sex", sex);
        formData.append("dateOfBirth", dateOfBirth);
        formData.append("nationality", nationality);
        formData.append("stateOfOrigin", stateOfOrigin);
        formData.append("religion", religion);
        formData.append("offence", offence);
        formData.append("judgement", judgement);
        formData.append("address", address);
        formData.append("dateAdmitted", dateAdmitted);
        formData.append("nextOfKin", nextOfKin);
        formData.append("nextOfKinAddress", nextOfKinAddress);
        const { data } = await inmate.saveInmateRecord(formData);
        toast(`${data.firstName} ${data.lastName} record saved successfully`);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data);
      }
    }
  };
  render() {
    const { gender, religion, previewSrc, isPreviewAvailable } = this.state;
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
          <h1>Inmate Registration</h1>
          <h4>Fill the form to register inmate data</h4>
        </div>
        <div className=" section mt-2 mb-5 p-3">
          <form onSubmit={this.handleSubmit}>
            <div className="section mt-3 text-center">
              <div className="avatar-section">
                {previewSrc ? (
                  isPreviewAvailable ? (
                    <img
                      src={previewSrc}
                      alt="avatar"
                      className="imaged w100 rounded"
                    />
                  ) : (
                    <img
                      src={uploadPreviewImg}
                      alt="avatar"
                      className="imaged w100 rounded"
                    />
                  )
                ) : (
                  <img
                    src={uploadPreviewImg}
                    alt="avatar"
                    className="imaged w100 rounded"
                  />
                )}
                <label htmlFor="image-upload">
                  <span className="button">
                    <FiCamera></FiCamera>
                  </span>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  onChange={this.handleImageChange}
                ></input>
              </div>
            </div>
            {this.renderInput("FirstName", "firstName", "Enter FirstName")}
            {this.renderInput("middleName", "middleName", "Enter MiddleName")}
            {this.renderInput("LastName", "lastName", "Enter LastName")}
            {this.renderDropDown("Sex", "sex", gender, "name", "id")}
            {this.renderInput(
              "Date Of Birth",
              "dateOfBirth",
              "Enter Date of Birth",
              "Date"
            )}
            {this.renderInput(
              "Nationality",
              "nationality",
              "Enter Nationality"
            )}
            {this.renderInput(
              "State of Origin",
              "stateOfOrigin",
              "Enter State"
            )}
            {this.renderDropDown(
              "Religion",
              "religion",
              religion,
              "name",
              "id"
            )}
            {this.renderInput("Offence", "offence", "Enter Criminal Offence")}
            {this.renderInput("Judgement", "judgement", "Enter Judgement")}
            {this.renderInput("Address", "address", "Enter Address")}
            {this.renderInput(
              "Date Admitted",
              "dateAdmitted",
              "Enter Date Admitted",
              "Date"
            )}
            {this.renderInput("Next of Kin", "nextOfKin", "Enter Next of Kin")}
            {this.renderInput(
              "Next of Kin Address",
              "nextOfKinAddress",
              "Enter Next of Kin Address"
            )}
            {this.renderButton("Submit")}
          </form>
        </div>
      </div>
    );
  }
}

export default RegistrationPage;
