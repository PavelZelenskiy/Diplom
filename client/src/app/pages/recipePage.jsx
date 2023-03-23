import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getRecipeById, loadRecipesList } from "../store/recipes";
import { getUserById } from "../store/users";
import { adminToggler } from "../utils/adminToggler";
import { getEatingTime } from "../utils/getEtingTime";

const URL = "http://84.38.180.24/api/recipes/";

const RecipePage = ({ recipeId }) => {
  const [token, setToken] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const history = useHistory();
  const recipe = useSelector(getRecipeById(recipeId));

  const dispatch = useDispatch();

  const handleToAllRecipes = () => {
    history.push("/recipes");
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    setCurrentUserId(userId);
    setToken(token);
  }, []);

  const currentUser = useSelector(getUserById(currentUserId));

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(URL + recipeId, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        dispatch(loadRecipesList());
        history.push("/recipes");
      });
  };

  const getAdminButtons = (recipe) => {
    return (
      <div className="container">
        <Link
          to={`/editpage/${recipe._id}`}
          className="add_btn"
          style={{ margin: "0px 5px" }}
        >
          Редактировать
        </Link>{" "}
        <div
          onClick={handleDelete}
          className="add_btn"
          style={{ margin: "0px 5px" }}
        >
          Удалить
        </div>
      </div>
    );
  };

  return recipe ? (
    <div className="textcontainer">
      <h3>{recipe.name}</h3>
      <div>
        <div className="textcontainer " style={{ textAlign: "center" }}>
          {recipe.description}
        </div>
        <div className="container">
          <div style={{ margin: "0px 20px" }}>{getEatingTime(recipe)}</div>
          <div
            style={{ textAlign: "center", width: "50%", margin: "0px 30px" }}
          >
            {recipe.ingridients}
          </div>
          <div
            style={{ textAlign: "center", width: "50%", margin: "0px 30px" }}
          >
            {recipe.cooking}
          </div>
        </div>
      </div>
      <div className="container" style={{ justifyContent: "center" }}>
        <div>
          {currentUser
            ? adminToggler(currentUser, getAdminButtons(recipe), null)
            : null}
        </div>
        <div
          onClick={handleToAllRecipes}
          className="add_btn"
          style={{ margin: "0px 5px" }}
        >
          Все рецепты
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default RecipePage;
