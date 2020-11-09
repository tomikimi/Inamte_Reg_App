import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Form from "../common/form";
import * as auth from "../services/auth";
import "react-toastify/dist/ReactToastify.css";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  componentDidMount() {
    document.getElementById("body").className = "bg-light";
  }

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const data = this.state.data;
      const { data: loginDetails } = await auth.loginUser(data);
      localStorage.setItem("token", loginDetails);
      window.location = "/welcomePage";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...error };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div>
        <ToastContainer></ToastContainer>
        <div className="section mt-2 text-center">
          <h1>Log in</h1>
          <h4>Fill the form to log in</h4>
        </div>
        <div className="section mt-2 mb-5 p-3">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("Username", "username", "Email")}
            {this.renderInput("Password", "password", "Password")}
            {this.renderButton("Log In")}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
