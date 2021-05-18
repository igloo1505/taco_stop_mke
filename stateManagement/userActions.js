import dynamic from "next/dynamic";
import {
  AUTHENTICATE_USER,
  AUTHENTICATION_ERROR,
  REGISTER_NEW_USER,
  GET_ALL_USERS,
  USER_ERROR,
  USER_ERROR_WITH_DIALOGUE,
  REMOVE_USER,
  ERROR_WITH_MODAL,
} from "./TYPES";
let Modal;
import colors from "colors";
import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const authenticateUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post("/api/portal/login", user, config);
    dispatch({
      type: AUTHENTICATE_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTHENTICATION_ERROR,
      payload: error,
    });
  }
};

export const addNewUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post("/api/portal/newUser", user, config);
    dispatch({
      type: REGISTER_NEW_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_WITH_MODAL,
      payload: error,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/portal/", config);
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};

export const removeUser = (userID) => async (dispatch) => {
  try {
    // const res = await axios.post("/api/portal/removeUser/", userID, config);
    const res = await axios.get("/api/portal/removeUser", config);
    dispatch({
      type: REMOVE_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};
