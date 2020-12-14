import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

class Accused extends Component {
  state = {
    headers: [
      {
        label: "FirstName",
      },
      {
        label: "LastName",
      },
      { key: "save" },
      { key: "delete" },
    ],
    inputList: [
      {
        firstName: "",
        lastName: "",
      },
    ],
    inputs: { firstName: "", lastName: "" },
  };
  handleRemove = (index, section) => {
    switch (section) {
      case "ACCUSED":
        const inputList = [...this.state.inputList];
        inputList.splice(index, 1);
        console.log(inputList);
        this.setState({ inputList });
        break;
    }
  };
  handleAddRow = (obj, section) => {
    switch (section) {
      case "ACCUSED":
        const inputList = [...this.state.inputList];
        inputList.push(obj);
        this.setState({ inputList });
        break;
    }
  };
  handleChange = (e, i, section) => {
    switch (section) {
      case "ACCUSED":
        const { name, value } = e.target;
        const inputs = [...this.state.inputList];
        inputs[i][name] = value;
        this.setState({ inputList: inputs });
        break;
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const data = [...this.state.accusedData];
    data.push(this.state.accused);
    console.log(data);
  };
  // handleRemove = (index) => {
  //   const inputList = [...this.state.inputList];
  //   inputList.splice(index, 1);
  //   this.setState({ inputList });
  // };
  // handleAddRow = () => {
  //   const inputList = [...this.state.inputList];
  //   inputList.push({ firstName: "", lastName: "" });
  //   this.setState({ inputList });
  // };
  // handleChange = (e, i) => {
  //   const { name, value } = e.target;
  //   const inputs = [...this.state.inputList];
  //   inputs[i][name] = value;
  //   this.setState({ inputList: inputs });
  // };
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = [...this.state.accusedData];
  //   data.push(this.state.accused);
  //   console.log(data);
  // };
  render() {
    const { headers, inputs, inputList } = this.state;
    return (
      <div>
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
        {/* <Table
          headers={headers}
          inputs={inputs}
          inputList={inputList}
          onAddrow={this.handleAddRow}
          onRemove={this.handleRemove}
          onChange={this.handleChange}
        ></Table> */}
        {/* <div className="section full mt-1 mb-2">
          <div className="section-title">Default</div>
          <div className="content-header mb-05">
            Tables are responsive ready with <code>.table-responsive</code>
          </div>
          <div className="wide-block p-0">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    {headers.map((header) => (
                      <th key={header.label || header.key} scope="col">
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {inputList.map((input, i) => {
                    return (
                      <tr>
                        <td>
                          <input
                            name="firstName"
                            className="form-control"
                            value={input.firstName}
                            onChange={(e) => this.handleChange(e, i)}
                          ></input>
                        </td>
                        <td>
                          <input
                            name="lastName"
                            className="form-control"
                            value={input.lastName}
                            onChange={(e) => this.handleChange(e, i)}
                          ></input>
                        </td>
                        <td>
                          {inputList.length !== 1 && (
                            <button
                              className="btn btn-primary mr-1 mb-1"
                              onClick={() => this.handleRemove(i)}
                            >
                              Remove
                            </button>
                          )}
                        </td>
                        <td>
                          {inputList.length - 1 === i && (
                            <button
                              className="btn btn-primary mr-1 mb-1"
                              onClick={this.handleAddRow}
                            >
                              Add
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div> */}
        <pre>{JSON.stringify(inputList, null, 2)}</pre>
      </div>
    );
  }
}

export default Accused;
