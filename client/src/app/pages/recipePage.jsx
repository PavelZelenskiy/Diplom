import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getRecipeById } from "../store/recipes";

const RecipePage = ({ recipeId }) => {
  const [token, setToken] = useState();
  const history = useHistory();
  const recipe = useSelector(getRecipeById(recipeId));

  const handleToAllRecipes = () => {
    history.push("/recipes");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  return recipe ? (
    <div className="m-10 p-3 text-center">
      <h1 className="m-10 p-3 text-center text-3xl">{recipe.name}</h1>
      <div className="m-10 p-3 text-center text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea odit a aut,
        atque recusandae officiis praesentium ullam nihil, accusantium dolores
        ratione, minus tempora aliquid assumenda distinctio suscipit eius vero
        perspiciatis.
      </div>
      <div className="container flex justify-center space-x-4">
        <p className="border-b-2  hover:border-slate-500  transition delay-100">
          {token ? (
            <Link to={`/editpage/${recipe._id}`}>Редактировать</Link>
          ) : (
            ""
          )}
        </p>
        <button
          onClick={handleToAllRecipes}
          className="border-b-2  hover:border-slate-500  transition delay-100"
        >
          Все рецепты
        </button>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default RecipePage;
