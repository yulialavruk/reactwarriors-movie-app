import React from "react";
import { withAuth } from "../App";

export default Component =>
  class withAuthHOC extends React.Component {
    render() {
      return (
        <withAuth.Consumer>
          {context => <Component {...this.props} {...context} />}
        </withAuth.Consumer>
      );
    }
  };
