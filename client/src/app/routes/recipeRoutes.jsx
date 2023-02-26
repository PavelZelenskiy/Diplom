import React from "react";
import { useParams } from "react-router-dom";
import RecipePage from "../pages/recipePage";
import RecipesList from "../pages/recipesList";

const RecipeRoutes = () => {
  const params = useParams();
  const { recipeId } = params;
  return <>{recipeId ? <RecipePage recipeId={recipeId} /> : <RecipesList />}</>;
};

export default RecipeRoutes;
