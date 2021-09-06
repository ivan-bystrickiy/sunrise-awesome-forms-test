import React, { useState } from "react";
import "./Select.scss";
import arrowDownIcon from "./arrow-down.svg";

function Select(props) {
  const {
    className = "",
    defaultValue = "",
    onChange: handleChange,
    placeholder = "",
    ...rest
  } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const onChange = (newValue) => {
    setValue(newValue);
    setOpen(false);
    handleChange && handleChange(newValue);
  };

  const acitveOption = props.children.find((option) => {
    return option.props.value === value;
  });

  return (
    <div className={`Select`} {...rest}>
      <div
        className={`Select__value form-control ${className}`}
        onClick={() => setOpen(!open)}
      >
        <img src={arrowDownIcon} alt="arrow" />
        <span>{acitveOption?.props.label || placeholder}</span>
      </div>

      {open && (
        <div className="Select__dropdown">
          {props.children.map((Option, idx) =>
            React.cloneElement(Option, {
              active: value,
              onChange: onChange,
              key: idx + value,
            })
          )}
        </div>
      )}
    </div>
  );
}

Select.Option = function (props) {
  const { label, value, active, onChange } = props;

  return (
    <div
      className={`Select__option ${
        value === active ? "Select__option_active" : ""
      }`}
      onClick={() => onChange(value)}
    >
      {label}
    </div>
  );
};

export { Select };
