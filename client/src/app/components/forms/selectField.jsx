import React from "react";

const SelectField = ({
  label,
  value,
  onChange,
  options,
  defaultOption,
  name,
}) => {
  return (
    <div className="select">
      <label htmlFor="selectField">{label}</label>
      <select value={value} onChange={onChange} name={name}>
        <option disabled value="">
          {defaultOption}
        </option>
        {options &&
          options.map((option) => {
            return (
              <option value={option.type} key={option._id}>
                {option.name}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default SelectField;
