import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import Login from "./components/login";
import LogOut from "./components/logOut";
import WelcomePage from "./components/welcomePage";
import WelcomeRoute from "./common/welcomePageRoute";
import RegistrationPage from "./components/registrationPage";
import RegisteredInmates from "./components/registeredInmates";
import "../src/assets/css/style.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const token = localStorage.getItem("token");
      const userData = jwtDecode(token);
      this.setState({ userData });
    } catch (error) {}
  }

  render() {
    const { userData } = this.state;
    return (
      <div id="appCapsule">
        <ToastContainer></ToastContainer>
        <Switch>
          <Route
            path="/RegisteredInmates"
            component={RegisteredInmates}
          ></Route>
          <Route path="/RegistrationPage" component={RegistrationPage}></Route>
          {/* <Route
            path="/welcomePage"
            component={welcomePage}
            exact={true}
          ></Route> */}
          <WelcomeRoute
            path="/welcomePage"
            component={WelcomePage}
            user={userData}
          ></WelcomeRoute>
          <Route path="/LogOut" component={LogOut}></Route>
          <Route path="/" component={Login} exact={true}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
