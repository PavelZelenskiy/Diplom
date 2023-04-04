import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./pages/main";
import NavBar from "./components/navBar";
import RecipeRoutes from "./routes/recipeRoutes";
import SignUp from "./pages/signUp";
import { useTheme } from "./hooks/useTheme";
import EditPage from "./pages/editPage";
import { loadRecipesList } from "./store/recipes";
import { useDispatch } from "react-redux";
import { loadUsersList } from "./store/users";
import addRecipe from "./pages/addRecipePage";

const App = () => {
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRecipesList());
    dispatch(loadUsersList());
  }, []);

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div>
      <div className="header">
        <NavBar />
        <button onClick={toggleTheme} className="activebtn">
          Переключить тему
        </button>
      </div>
      <div>
        <Switch>
          <Route path="/recipes/:recipeId?" component={RecipeRoutes} />
          <Route path="/signup" component={SignUp} />
          <Route path="/editpage/:recipeId" component={EditPage} />
          <Route path="/addrecipe" component={addRecipe} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
};

export default App;
