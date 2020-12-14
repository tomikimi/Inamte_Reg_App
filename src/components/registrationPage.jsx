import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { FiChevronLeft, FiCamera, FiFile } from "react-icons/fi";
import jsonToFormData from "json-form-data";
import * as inmate from "../services/inmateService";
import * as station from "../services/stationService";
import * as attachedRecord from "../services/data";
import Form from "../common/form";
import Modal from "../common/modal";
import Table2 from "../common/table2";
import uploadPreviewImg from "../assets/img/sample/avatar/avatar1.jpg";
import loaderIcon from "../assets/img/logo-icon.png";
import $ from "jquery";

class RegistrationPage extends Form {
  state = {
    data: {
      stationID: "",
      officer: "",
      offence: "",
      offenceLocation: "",
      offenceDate: "",
      caseStatus: "",
      arrested: "",
      complainerName: "",
      complainerAddress: "",
      complainerPhoneNumber: "",
    },
    errors: {},
    stations: [],
    accusedInfo: [],
    victimInfo: [],
    witnessInfo: [],
    accusedColumns: [
      { label: "FullName", path: "accusedFullname" },
      { label: "Address", path: "accusedAddress" },
      { label: "Age", path: "accusedAge" },
      { label: "Gender", path: "accusedGender" },
    ],
    victimColumns: [
      { label: "FullName", path: "victimsFullname" },
      { label: "Address", path: "victimsAddress" },
      { label: "Age", path: "victimsAge" },
      { label: "Gender", path: "victimsGender" },
    ],
    witnessColumns: [
      { label: "FullName", path: "witnessFullname" },
      { label: "Contact", path: "witnessContact" },
    ],
    gender: [
      { id: "Male", name: "Male" },
      { id: "Female", name: "Female" },
    ],
    crimeID: "",
    contentType: "data:image/jpeg;base64,",
    pictureData: "",
    file: "",
    previewSrc: "",
    modalErrorMessage: "",
    isPreviewAvailable: false,
    modalState: false,
    displayState: false,
    modalTitle: "",
  };
  populateStation = async function () {
    const { data } = await station.getStations();
    return data;
  };
  populateData = async function (id) {
    const { data } = await inmate.getInmateRecordByID(id);
    return data;
  };
  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  async componentDidMount() {
    const token = localStorage.getItem("token");
    const { id } = this.props.match.params;
    $(document).ready(function () {
      setTimeout(() => {
        $("#loader").fadeToggle(250);
      }, 800);
    });
    try {
      if (!token) {
        window.location = "/";
      } else if (token && id) {
        try {
          let witnessInfo;
          const inmateData = await this.populateData(id);
          const stations = await this.populateStation();
          const data = {
            stationID: inmateData[0].station._id,
            officer: inmateData[0].officer,
            offence: inmateData[0].offence,
            offenceLocation: inmateData[0].offenceLocation,
            offenceDate: inmateData[0].offenceDate,
            caseStatus: inmateData[0].caseStatus,
            arrested: inmateData[0].arrested,
            complainerName: inmateData[0].complainerName,
            complainerAddress: inmateData[0].complainerAddress,
            complainerPhoneNumber: inmateData[0].complainerPhoneNumber,
          };
          if (inmateData[0].witnessInfo) {
            witnessInfo = inmateData[0].witnessInfo;
          } else {
            witnessInfo = [];
          }
          this.setState({
            crimeID: true,
            data,
            stations: stations,
            pictureData: inmateData[0].filePath.data.data,
            accusedInfo: inmateData[0].accusedInfo,
            victimInfo: inmateData[0].victimInfo,
            witnessInfo: witnessInfo,
          });
        } catch (error) {
          if (error.response && error.response.status === 400) {
            this.props.history.replace("/NotFound");
          }
        }
      } else if (token) {
        const stations = await this.populateStation();
        this.setState({ stations });
      }
    } catch (error) {}

    document.getElementById("body").className = "bg-light";
  }

  //
  schema = {
    stationID: Joi.string().required().label("Station"),
    officer: Joi.string().required().label("Officer"),
    offence: Joi.string().required().label("Offence"),
    offenceLocation: Joi.string().required().label("Location"),
    offenceDate: Joi.string().required().label("Date of Offence"),
    caseStatus: Joi.string().required().label("Case Status"),
    arrested: Joi.string().required().label("Arrested"),
    complainerName: Joi.string().required().label("Complainer Name"),
    complainerAddress: Joi.string().required().label("Complainer Address"),
    complainerPhoneNumber: Joi.string()
      .required()
      .label("Complainer PhoneNumber"),
  };
  handleModalState = (title, modalstate) => {
    const { modalState, displayState } = this.state;
    const modalTitle = title;
    switch (modalTitle) {
      case "accused":
        this.setState({
          modalState: !modalState,
          displayState: !displayState,
          modalTitle,
        });
        break;
      case "victims":
        this.setState({
          modalState: !modalState,
          displayState: !displayState,
          modalTitle,
        });
        break;
      case "witness":
        this.setState({
          modalState: !modalState,
          displayState: !displayState,
          modalTitle,
        });
        break;
    }
  };
  handleImageChange = (event) => {
    const file = event.target.files[0];
    const previewSrc = URL.createObjectURL(event.target.files[0]);
    const isPreviewAvailable = event.target.files[0].name.match(
      /\.(jpeg|jpg|png)$/
    );
    this.setState({ file, previewSrc, isPreviewAvailable });
  };

  handleModalData = (Section, data) => {
    switch (Section) {
      case "accused":
        const {
          accusedFullname,
          accusedAddress,
          accusedAge,
          accusedGender,
        } = data;
        if (
          accusedFullname.trim() === "" &&
          accusedAddress.trim() === "" &&
          accusedAge.trim() === "" &&
          accusedGender.trim() === ""
        ) {
          this.setState({
            modalErrorMessage: "One or More fields are yet to be filled",
          });
        } else {
          let counter;
          if (this.state.accusedInfo.length > 0) {
            counter = this.state.accusedInfo.length + 1;
          } else {
            counter = 1;
          }
          const response = attachedRecord.postAccusedData({
            id: counter,
            ...data,
          });
          this.setState({ accusedInfo: response });
          toast.success("Accused Information Added");
        }
        break;
      case "victims":
        const {
          victimsFullname,
          victimsAddress,
          victimsAge,
          victimsGender,
        } = data;
        if (
          victimsFullname.trim() === "" &&
          victimsAddress.trim() === "" &&
          victimsAge.trim() === "" &&
          victimsGender.trim() === ""
        ) {
          this.setState({
            modalErrorMessage: "One or More fields are yet to be filled",
          });
        } else {
          let counter;
          if (this.state.victimInfo.length > 0) {
            counter = this.state.victimInfo.length + 1;
          } else {
            counter = 1;
          }
          const response = attachedRecord.postVictimsData({
            id: counter,
            ...data,
          });
          this.setState({ victimInfo: response });
          //this.handleModalState("Victims");
          toast.success("Victims Information Added");
        }
        break;
      case "witness":
        const { witnessFullname, witnessContact } = data;
        if (witnessFullname.trim() === "" && witnessContact.trim() === "") {
          this.setState({
            modalErrorMessage: "One or More fields are yet to be filled",
          });
        } else {
          let counter;
          if (this.state.witnessInfo.length > 0) {
            counter = this.state.witnessInfo.length + 1;
          } else {
            counter = 1;
          }
          const response = attachedRecord.postWitnessData({
            id: counter,
            ...data,
          });
          this.setState({ witnessInfo: response });
          //this.handleModalState("Witness");
          toast.success("Witness Information Added");
        }
        break;
    }
  };

  doSubmit = async () => {
    try {
      const { file } = this.state;

      const { accusedInfo, victimInfo, witnessInfo } = this.state;
      if (file) {
        const sample = {
          file: file,
          accusedInfo: accusedInfo,
          victimInfo: victimInfo,
          witnessInfo: witnessInfo,
          ...this.state.data,
        };
        var options = {
          initialFormData: new FormData(),
          showLeafArrayIndexes: true,
          includeNullValues: false,
          mapping: function (value) {
            if (typeof value === "boolean") {
              return +value ? "1" : "0";
            }
            return value;
          },
        };

        var jsdf = jsonToFormData(sample, options);
        const { data } = await inmate.saveInmateRecord(jsdf);
        setTimeout(() => {
          toast(`${data.complainerName} Registered Successfully`);
        }, 200);
        setTimeout(() => {
          window.location = "/RegistrationPage";
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data);
      }
    }
  };
  render() {
    const {
      crimeID,
      pictureData,
      contentType,
      accusedInfo,
      accusedColumns,
      victimInfo,
      victimColumns,
      witnessInfo,
      witnessColumns,
      stations,
      modalTitle,
      modalState,
      displayState,
      previewSrc,
      isPreviewAvailable,
      modalErrorMessage,
    } = this.state;
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
          <h1>Crime Register</h1>
          <h4>Fill the form to register a crime</h4>
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
                    src={
                      crimeID === true
                        ? `${contentType} ${this.arrayBufferToBase64(
                            pictureData
                          )}`
                        : uploadPreviewImg
                    }
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
            {this.renderDropDown(
              "Station",
              "stationID",
              stations,
              "name",
              "_id"
            )}
            {this.renderInput("Officer", "officer", "Enter Officer Name")}
            {this.renderInput("Offence", "offence", "Enter Criminal Offence")}
            {this.renderInput(
              "offenceLocation",
              "offenceLocation",
              "Enter Location of Offence"
            )}
            {this.renderInput("Date of Offence", "offenceDate", "", "Date")}
            {this.renderInput("Arrested", "arrested", "Enter Yes or No")}
            {this.renderInput("Case Status", "caseStatus", "Enter Case Status")}
            {this.renderInput(
              "Complainer Name",
              "complainerName",
              "Enter Name of Complainer"
            )}
            {this.renderInput(
              "Complainer Address",
              "complainerAddress",
              "Enter Address of Complainer"
            )}
            {this.renderInput(
              "Complainer PhoneNumber",
              "complainerPhoneNumber",
              "Enter PhoneNumber of Complainer"
            )}
            <NavLink
              to="#"
              className="btn btn-primary btn-sm mr-1 mb-1"
              onClick={() => this.handleModalState("accused", modalState)}
            >
              <FiFile size={20}></FiFile>Add Accused Data
            </NavLink>
            <Table2
              id={"Accused"}
              header={accusedColumns}
              data={accusedInfo}
            ></Table2>
            <NavLink
              to="#"
              className="btn btn-primary btn-sm mr-1 mb-1"
              onClick={() => this.handleModalState("victims", modalState)}
            >
              <FiFile size={20}></FiFile>Add Victims Data
            </NavLink>
            <Table2
              id={"Victims"}
              header={victimColumns}
              data={victimInfo}
            ></Table2>
            <NavLink
              to="#"
              className="btn btn-primary btn-sm mr-1 mb-1"
              onClick={() => this.handleModalState("witness", modalState)}
            >
              <FiFile size={20}></FiFile>Add Witness Data
            </NavLink>
            <Table2
              id={"Witness"}
              header={witnessColumns}
              data={witnessInfo}
            ></Table2>
            {crimeID === true
              ? this.renderButton("Update", "none")
              : this.renderButton("Submit", "block")}
          </form>
        </div>
        <Modal
          modalTitle={modalTitle}
          modalState={modalState}
          displayState={displayState}
          handleModalState={this.handleModalState}
          onAdd={this.handleModalData}
          errMsg={modalErrorMessage}
        ></Modal>
      </div>
    );
  }
}

export default RegistrationPage;
