import React from "react";

const Input = (props) => {
  const { name, label, value, placeholder, type, error, onChange } = props;
  return (
    <div className="form-group basic">
      <div className="input-wrapper">
        <label className="label" htmlFor={name}>
          {label}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-control"
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default Input;
