import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./pages/main";
import NavBar from "./components/navBar";
import RecipeRoutes from "./routes/recipeRoutes";
import SignUp from "./pages/signUp";
import { useTheme } from "./hooks/useTheme";
import EditPage from "./pages/editPage";
import { loadRecipesList } from "./store/recipes";
import { useDispatch } from "react-redux";

const App = () => {
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRecipesList());
  }, []);

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div className="transition duration-1000 dark:bg-slate-800 dark:text-gray-400 ">
      <div className="container flex justify-between">
        <NavBar />
        <button
          onClick={toggleTheme}
          className="border-b-2  hover:border-slate-500  transition delay-100"
        >
          Переключить тему
        </button>
      </div>
      <div>
        <Switch>
          <Route path="/recipes/:recipeId?" component={RecipeRoutes} />
          <Route path="/signup" component={SignUp} />
          <Route path="/editpage/:recipeId" component={EditPage} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
};

export default App;
