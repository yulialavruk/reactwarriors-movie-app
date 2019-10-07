import React from "react";
import { withUser } from "../App";

export default Component =>
  class withUserHOC extends React.Component {
    render() {
      return (
        <withUser.Consumer>
          {context => <Component {...this.props} {...context} />}
        </withUser.Consumer>
      );
    }
  };
