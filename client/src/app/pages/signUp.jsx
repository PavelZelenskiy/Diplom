import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../components/forms/textField";
import { validator } from "../utils/validator";

const SignUp = () => {
  const [data, setData] = useState({ email: "", password: "", name: "" });
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
    name: { isRequired: { message: "Имя обязательно для заполнения" } },
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
      .post("http://84.38.180.24/api/signup", {
        ...data,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="m-10 p-3 text-center">Регистрация</div>
      <form className="container m-5 shadow-lg">
        <TextField
          label="Имя"
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          error={validateErrors.name}
          placeholder={"Имя необходимо для заполнения"}
        />
        <TextField
          label="Электронная почта"
          type="text"
          name="email"
          value={data.email}
          onChange={handleChange}
          error={validateErrors.email}
          placeholder={"Электронная почта неообходима для заполнения"}
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
          onClick={handleSubmit}
          disabled={!isValid}
          className={
            !isValid
              ? `text-white justify-center m-4 border-b-2 `
              : `border-b-2  hover:border-slate-500  transition delay-100 m-4 `
          }
        >
          Отправить
        </button>
      </form>
    </>
  );
};

export default SignUp;
