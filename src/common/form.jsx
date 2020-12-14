import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/input";
import Dropdown from "../common/dropdown";

class Form extends Component {
  state = { data: {}, errors: {} };
  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    const { error } = result;
    const errors = {};

    if (!error) return null;

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };
  renderInput = (label, name, placeholder, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        id={name}
        name={name}
        label={label}
        type={type}
        value={data[name]}
        placeholder={placeholder}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
  renderDropDown = (label, name, value, textProperty, valueProperty) => {
    const { data, errors } = this.state;
    return (
      <Dropdown
        id={name}
        name={name}
        label={label}
        value={data[name]}
        options={value}
        textProperty={textProperty}
        valueProperty={valueProperty}
        onChange={this.handleChange}
        error={errors[name]}
      ></Dropdown>
    );
  };
  renderButton = (label, displayStyle, spinnerStatus = false) => {
    if (spinnerStatus === true) {
      return (
        <div className="form-button-group">
          <button
            disabled={this.validate()}
            className="btn btn-primary btn-block btn-lg"
          >
            <span className="" role="status" aria-hidden="true"></span>
            {label}
          </button>
        </div>
      );
    } else {
      return (
        <div style={{ display: displayStyle }} className="form-button-group">
          <button
            disabled={this.validate()}
            className="btn btn-primary btn-block btn-lg"
          >
            {label}
          </button>
        </div>
      );
    }
  };
}

export default Form;
