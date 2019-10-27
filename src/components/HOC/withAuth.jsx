import React from "react";
import { AuthContext } from "../App";

export default Component =>
  class withAuth extends React.Component {
    render() {
      return (
        <AuthContext.Consumer>
          {context => <Component {...this.props} {...context} />}
        </AuthContext.Consumer>
      );
    }
  };
