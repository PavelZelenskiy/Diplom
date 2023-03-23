import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./recipes";
import usersReducer from "./users";

const rootReducer = combineReducers({
  recipes: recipesReducer,
  users: usersReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
