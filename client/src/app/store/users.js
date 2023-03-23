import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:8080/api/";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const { usersRequested, usersReceived, usersRequestFailed } = actions;

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());

  await axios
    .get(URL + "users")
    .then((res) => dispatch(usersReceived(res.data)))
    .catch((err) => dispatch(usersRequestFailed(err.message)));
};

export const getUsers = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getUserById = (id) => (state) => {
  const usersArr = state.users.entities;
  return usersArr ? usersArr.find((r) => r._id === id) : null;
};

export default usersReducer;
