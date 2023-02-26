import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./recipes";

const rootReducer = combineReducers({ recipes: recipesReducer });

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
