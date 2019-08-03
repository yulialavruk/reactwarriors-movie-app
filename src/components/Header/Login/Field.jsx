import React from "react";

const Field = props => {
  const {
    id,
    labelText,
    type,
    placeholder,
    name,
    value,
    onChange,
    handleBlur,
    error
  } = props;
  return (
    <div className="form-group">
      <label htmlFor={id}>{labelText}</label>
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
export default Field;
