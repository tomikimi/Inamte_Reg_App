import { isNullOrUndefined } from "joi-browser";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class Modal extends Component {
  state = {
    info: [],
    accusedData: {
      accusedFullname: "",
      accusedAddress: "",
      accusedAge: "",
      accusedGender: "",
    },
    victimsData: {
      victimsFullname: "",
      victimsAddress: "",
      victimsAge: "",
      victimsGender: "",
    },
    witnessData: { witnessFullname: "", witnessContact: "" },
    errors: "",
    sex: [
      { id: "Male", name: "Male" },
      { id: "Female", name: "Female" },
    ],
  };

  componentDidUpdate(prevProps, prevState) {
    const { modalTitle, modalState } = prevProps;
    const { accusedData, victimsData, witnessData } = prevState;
    if (
      modalTitle === "accused" &&
      modalState === false &&
      accusedData.accusedFullname.trim() !== ""
    ) {
      const accusedData = {
        accusedFullname: "",
        accusedAddress: "",
        accusedAge: "",
        accusedGender: "",
      };
      this.setState({ accusedData });
    }
    if (
      modalTitle === "victims" &&
      modalState === false &&
      victimsData.victimsFullname.trim() !== ""
    ) {
      const victimsData = {
        victimsFullname: "",
        victimsAddress: "",
        victimsAge: "",
        victimsGender: "",
      };
      this.setState({ victimsData });
    }
    if (
      modalTitle === "witness" &&
      modalState === false &&
      witnessData.witnessFullname.trim() !== ""
    ) {
      const witnessData = {
        witnessFullname: "",
        witnessContact: "",
      };
      this.setState({ witnessData });
    }
  }

  handleChange = (e, section) => {
    const { name, value } = e.target;
    switch (section) {
      case "accused":
        const accusedData = this.state.accusedData;
        accusedData[name] = value;
        this.setState({ accusedData });
        break;
      case "victims":
        const victimsData = this.state.victimsData;
        victimsData[name] = value;
        this.setState({ victimsData });
        break;
      case "witness":
        const witnessData = this.state.witnessData;
        witnessData[name] = value;
        this.setState({ witnessData });
        break;
    }
  };

  handleAdd = (obj) => {
    const { info } = this.state;
    info.push(obj);
    this.setState({ info });
    console.log(this.state.info);
  };

  doSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const {
      modalTitle,
      modalState,
      displayState,
      handleModalState,
      errMsg,
      onAdd,
    } = this.props;
    const {
      accusedFullname = "",
      accusedAddress,
      accusedAge,
      accusedGender,
    } = this.state.accusedData;
    const {
      victimsFullname,
      victimsAddress,
      victimsAge,
      victimsGender,
    } = this.state.victimsData;
    const { witnessFullname, witnessContact } = this.state.witnessData;
    const { sex } = this.state;
    if (modalTitle === "accused") {
      return (
        <>
          <div
            className={
              modalState === true
                ? "modal fade modalbox show"
                : "modal fade modalbox"
            }
            id="ModalBasic"
            tabIndex="-1"
            role="dialog"
            style={
              displayState === true ? { display: "block" } : { display: "none" }
            }
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{modalTitle}</h5>
                  <NavLink
                    to="#"
                    data-dismiss="modal"
                    onClick={() => handleModalState("accused", modalState)}
                  >
                    Close
                  </NavLink>
                </div>
                <div className="modal-body">
                  {errMsg && <div className="alert alert-danger">{errMsg}</div>}
                  <div className=" action-sheet-content">
                    <form>
                      <div className="form-group basic">
                        <div className="input-wrapper">
                          <label className="label" htmlFor="fullName">
                            Fullname
                          </label>
                          <input
                            id="fullName"
                            name="accusedFullname"
                            type="text"
                            value={accusedFullname}
                            onChange={(e) => this.handleChange(e, "accused")}
                            placeholder=""
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group basic">
                        <div className="input-wrapper">
                          <label className="label" htmlFor="address">
                            Address
                          </label>
                          <input
                            id="Address"
                            name="accusedAddress"
                            type="text"
                            value={accusedAddress}
                            onChange={(e) => this.handleChange(e, "accused")}
                            placeholder=""
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group basic">
                        <div className="input-wrapper">
                          <label className="label" htmlFor="age">
                            Age
                          </label>
                          <input
                            id="Age"
                            name="accusedAge"
                            type="text"
                            value={accusedAge}
                            onChange={(e) => this.handleChange(e, "accused")}
                            placeholder=""
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group basic">
                        <div className="input-wrapper">
                          <label className="label" htmlFor="sex">
                            Gender
                          </label>
                          <select
                            id="sex"
                            name="accusedGender"
                            value={accusedGender}
                            onChange={(e) => this.handleChange(e, "accused")}
                            className="form-control"
                          >
                            <option value=""> {`Select Gender`}</option>
                            {sex.map((sex) => (
                              <option key={sex.id} value={sex.name}>
                                {sex.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-button-group">
                        <NavLink
                          to="#"
                          className="btn btn-primary btn-block btn-lg"
                          onClick={() =>
                            onAdd("accused", this.state.accusedData)
                          }
                        >
                          Submit
                        </NavLink>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={modalState === true ? "modal-backdrop fade show" : ""}
          ></div>
        </>
      );
    } else if (modalTitle === "victims") {
      return (
        <>
          <div
            className={
              modalState === true
                ? "modal fade modalbox show"
                : "modal fade modalbox"
            }
            id="ModalBasic"
            tabIndex="-1"
            role="dialog"
            style={
              displayState === true ? { display: "block" } : { display: "none" }
            }
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{modalTitle}</h5>
                  <NavLink
                    to="#"
                    data-dismiss="modal"
                    onClick={() => handleModalState("victims", modalState)}
                  >
                    Close
                  </NavLink>
                </div>
                <div className="modal-body">
                  {errMsg && <div className="alert alert-danger">{errMsg}</div>}
                  <div className=" action-sheet-content">
                    <form onSubmit={this.doSubmit}>
                      <div className="form-group basic">
                        <div className="input-wrapper">
                          <label className="label" htmlFor="fullName">
                            Fullname
                          </label>
                          <input
                            id="fullName"
                            name="victimsFullname"
                            type="text"
                            value={victimsFullname}
                            onChange={(e) => this.handleChange(e, "victims")}
                            placeholder=""
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group basic">
                        <div className="input-wrapper">
                          <label className="label" htmlFor="address">
                            Address
                          </label>
                          <input
                            id="Address"
                            name="victimsAddress"
                            type="text"
                            value={victimsAddress}
                            onChange={(e) => this.handleChange(e, "victims")}
                            placeholder=""
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group basic">
                        <div className="input-wrapper">
                          <label className="label" htmlFor="age">
                            Age
                          </label>
                          <input
                            id="Age"
                            name="victimsAge"
                            type="text"
                            value={victimsAge}
                            onChange={(e) => this.handleChange(e, "victims")}
                            placeholder=""
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group basic">
                        <div className="input-wrapper">
                          <label className="label" htmlFor="sex">
                            Gender
                          </label>
                          <select
                            id="sex"
                            name="victimsGender"
                            value={victimsGender}
                            onChange={(e) => this.handleChange(e, "victims")}
                            className="form-control"
                          >
                            <option value=""> {`Select Gender`}</option>
                            {sex.map((sex) => (
                              <option key={sex.id} value={sex.name}>
                                {sex.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-button-group">
                        <NavLink
                          to="#"
                          className="btn btn-primary btn-block btn-lg"
                          onClick={() =>
                            onAdd("victims", this.state.victimsData)
                          }
                        >
                          Submit
                        </NavLink>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={modalState === true ? "modal-backdrop fade show" : ""}
          ></div>
        </>
      );
    } else {
      return (
        <>
          <div
            className={
              modalState === true
                ? "modal fade modalbox show"
                : "modal fade modalbox"
            }
            id="ModalBasic"
            tabIndex="-1"
            role="dialog"
            style={
              displayState === true ? { display: "block" } : { display: "none" }
            }
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{modalTitle}</h5>
                  <NavLink
                    to="#"
                    data-dismiss="modal"
                    onClick={() => handleModalState("witness", modalState)}
                  >
                    Close
                  </NavLink>
                </div>
                <div className="modal-body">
                  {errMsg && <div className="alert alert-danger">{errMsg}</div>}
                  <div className=" action-sheet-content">
                    <form onSubmit={this.doSubmit}>
                      <div className="form-group basic">
                        <div className="input-wrapper">
                          <label className="label" htmlFor="fullName">
                            Fullname
                          </label>
                          <input
                            id="fullName"
                            name="witnessFullname"
                            type="text"
                            value={witnessFullname}
                            onChange={(e) => this.handleChange(e, "witness")}
                            placeholder=""
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group basic">
                        <div className="input-wrapper">
                          <label className="label" htmlFor="contact">
                            Contact
                          </label>
                          <input
                            id="Contact"
                            name="witnessContact"
                            type="text"
                            value={witnessContact}
                            onChange={(e) => this.handleChange(e, "witness")}
                            placeholder=""
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-button-group">
                        <NavLink
                          to="#"
                          className="btn btn-primary btn-block btn-lg"
                          onClick={() =>
                            onAdd("witness", this.state.witnessData)
                          }
                        >
                          Submit
                        </NavLink>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={modalState === true ? "modal-backdrop fade show" : ""}
          ></div>
        </>
      );
    }
  }
}

export default Modal;
