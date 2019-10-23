import React from "react";
import { Spinner } from "reactstrap";

const Loader = () => (
  <div className="row justify-content-center mt-4">
    <div className="col-3">
      <Spinner color="primary" />
    </div>
  </div>
);

export default Loader;
