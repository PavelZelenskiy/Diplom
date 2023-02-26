import React, { useEffect, useState } from "react";
import TextField from "./forms/textField";
import { validator } from "../utils/validator";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LogIn = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [validateErrors, setValidateErrors] = useState({});
  const history = useHistory();

  useEffect(() => {
    validate();
  }, [data]);

  const isValid = Object.keys(validateErrors).length === 0;
  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
    },
    password: { isRequired: { message: "Пароль обязателен для заполнения" } },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setValidateErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    axios
      .post("http://84.38.180.24/api/login", {
        ...data,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        history.push("/recipes");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="container m-5 shadow-lg">
      <TextField
        label="Электронная почта"
        type="text"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={validateErrors.email}
        placeholder={"Электронная почта необходима для заполнения"}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={validateErrors.password}
        placeholder={"Пароль необходим для заполнения"}
      />
      <button
        type="submit"
        disabled={!isValid}
        className={
          !isValid
            ? `text-white justify-center m-4  border-b-2`
            : `border-b-2  hover:border-slate-500  transition delay-100 m-4 `
        }
      >
        Отправить
      </button>
    </form>
  );
};

export default LogIn;
