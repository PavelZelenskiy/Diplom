import React from "react";

const TextField = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder,
}) => {
  return (
    <div className="form-row">
      <input
        className="placeholder"
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextField;
