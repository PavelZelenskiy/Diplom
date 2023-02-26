import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import TextField from "../components/forms/textField";
import { getRecipeById, loadRecipesList } from "../store/recipes";
import { validator } from "../utils/validator";

const URL = "http://84.38.180.24/api/editpage/";

const EditPage = () => {
  const [data, setData] = useState({ name: "" });
  const [validateErrors, setValidateErrors] = useState({});
  const [token, setToken] = useState();
  const history = useHistory();
  const params = useParams();
  const { recipeId } = params;
  const recipe = useSelector(getRecipeById(recipeId));
  const dispatch = useDispatch();

  const isValid = Object.keys(validateErrors).length === 0;
  const validatorConfig = {
    name: {
      isRequired: { message: "Название обязательно для заполнения" },
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
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    axios
      .patch(
        URL + recipeId,
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      )
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
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(URL + recipeId, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        dispatch(loadRecipesList());
        history.push("/recipes");
      });
  };

  return recipe ? (
    <div className="m-10 p-3 text-center">
      <h1 className="m-10 p-3 text-center text-3xl">Редактирование рецепта</h1>
      <div className="container m-2 shadow-lg">
        <form onSubmit={handleSubmit} className="container">
          <TextField
            label="Название"
            type="text"
            name="name"
            value={data.name}
            placeholder={recipe.name}
            onChange={handleChange}
            error={validateErrors.name}
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
        <button
          onClick={handleDelete}
          className="border-b-2  hover:border-slate-500  transition delay-100 mb-3"
        >
          Удалить
        </button>
      </div>
    </div>
  ) : (
    "loading..."
  );
};

export default EditPage;
