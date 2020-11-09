import React from "react";

const DropDown = ({
  label,
  name,
  value,
  options,
  textProperty,
  valueProperty,
  error,
  onChange,
}) => {
  return (
    <div className="form-group basic">
      <div className="input-wrapper">
        <label className="label" htmlFor={name}>
          {label}
        </label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="form-control"
        >
          <option value=""> {`Select ${label}`}</option>
          {options.map((options) => (
            <option key={options[valueProperty]} value={options[valueProperty]}>
              {options[textProperty]}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default DropDown;
