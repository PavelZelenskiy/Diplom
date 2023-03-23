import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:8080/api/";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    recipesRequested: (state) => {
      state.isLoading = true;
    },
    recipesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    recipesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: recipesReducer, actions } = recipesSlice;
const { recipesRequested, recipesReceived, recipesRequestFailed } = actions;

export const loadRecipesList = () => async (dispatch) => {
  dispatch(recipesRequested());

  await axios
    .get(URL + "recipes")
    .then((res) => dispatch(recipesReceived(res.data)))
    .catch((err) => dispatch(recipesRequestFailed(err.message)));
};

export const getRecipes = () => (state) => state.recipes.entities;
export const getRecipesLoadingStatus = () => (state) => state.recipes.isLoading;
export const getRecipeById = (id) => (state) => {
  const recipesArr = state.recipes.entities;
  return recipesArr ? recipesArr.find((r) => r._id === id) : null;
};

export default recipesReducer;
