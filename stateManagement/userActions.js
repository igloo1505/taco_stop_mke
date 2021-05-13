import {
  AUTHENTICATE_USER,
  AUTHENTICATION_ERROR,
  REGISTER_NEW_USER,
} from "./Types";
// import setAuthToken from "../setToken";
import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const authenticateUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post("/api/portal", user, config);
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
    console.log(res.data);
    dispatch({
      type: REGISTER_NEW_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTHENTICATION_ERROR,
      payload: error,
    });
  }
};
