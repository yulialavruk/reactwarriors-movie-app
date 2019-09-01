import React from "react";
import { LoginContext } from "../Header/Login/Login";

export default Component =>
  class LoginContextHOC extends React.Component {
    render() {
      return (
        <LoginContext.Consumer>
          {context => <Component {...this.props} {...context} />}
        </LoginContext.Consumer>
      );
    }
  };
