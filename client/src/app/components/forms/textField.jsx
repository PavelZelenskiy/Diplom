import React, { useState } from "react";

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
    <div className="container space-y-2 justify-between">
      <input
        className="container w-100 m-3 text-sm rounded outline-none border-l-2 focus:border-slate-500 p-1"
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
