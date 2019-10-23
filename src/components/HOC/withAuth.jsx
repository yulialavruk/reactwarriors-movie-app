import React from "react";
import { AuthContextHOC } from "../App";

export default Component =>
  class withAuth extends React.Component {
    render() {
      return (
        <AuthContextHOC.Consumer>
          {context => <Component {...this.props} {...context} />}
        </AuthContextHOC.Consumer>
      );
    }
  };
