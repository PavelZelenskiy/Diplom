import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SelectField from "../components/forms/selectField";
import TextField from "../components/forms/textField";
import { loadRecipesList } from "../store/recipes";
import { validator } from "../utils/validator";

const URL = "http://84.38.180.24/api/recipes/";

const AddRecipe = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    ingridients: "",
    cooking: "",
    type: "",
  });
  const [validateErrors, setValidateErrors] = useState({});
  const [eatingTypes, setEatingTypes] = useState([]);
  const [token, setToken] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  const isValid = Object.keys(validateErrors).length === 0;
  const validatorConfig = {
    name: {
      isRequired: { message: "Название обязательно для заполнения" },
    },
    description: {
      isRequired: { message: "Описание обязательно для заполнения" },
    },
    ingridients: {
      isRequired: { message: "Ингридиенты обязательны для заполнения" },
    },
    cooking: {
      isRequired: {
        message: "Способ приготовления обязателен для заполнения",
      },
    },
    types: {
      isRequired: {
        message: "Время приема обязательно для заполнения",
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setValidateErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [data]);

  useEffect(() => {
    axios
      .get("http://84.38.180.24/api/types")
      .then((res) => {
        setEatingTypes(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    axios
      .post(URL, { ...data }, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        dispatch(loadRecipesList());
        history.push("/recipes");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="loginform">
        <h3>Добавление рецепта</h3>
        <TextField
          label="Название"
          type="text"
          name="name"
          value={data.name}
          placeholder="Введите название блюда"
          onChange={handleChange}
          error={validateErrors.name}
        />
        <SelectField
          name="type"
          defaultOption="Выберите время приема блюда"
          value={data.type}
          onChange={handleChange}
          options={eatingTypes}
          error={validateErrors.types}
        />
        <TextField
          label="Описание"
          type="text"
          name="description"
          value={data.description}
          placeholder="Введите описание блюда"
          onChange={handleChange}
          error={validateErrors.description}
        />
        <TextField
          label="Ингридиенты"
          type="text"
          name="ingridients"
          value={data.ingridients}
          placeholder="Введите ингридиенты блюда"
          onChange={handleChange}
          error={validateErrors.ingridients}
        />
        <TextField
          label="Приготовление"
          type="text"
          name="cooking"
          value={data.cooking}
          placeholder="Введите способ приготовления блюда"
          onChange={handleChange}
          error={validateErrors.cooking}
        />
        <button
          type="submit"
          disabled={!isValid}
          className={!isValid ? "nonactivebtn" : "activebtn"}
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
