import React from "react";
import { UserContextHOC } from "../App";

export default Component =>
  class withUser extends React.Component {
    render() {
      return (
        <UserContextHOC.Consumer>
          {context => <Component {...this.props} {...context} />}
        </UserContextHOC.Consumer>
      );
    }
  };
