import React from "react";
import { Route } from "react-router-dom";

const WelcomeRoute = (props) => {
  const { path, component: Component, user } = props;
  return (
    <Route
      path={path}
      render={(props) => <Component {...props} user={user}></Component>}
    ></Route>
  );
};

export default WelcomeRoute;
