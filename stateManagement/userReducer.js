import {
  AUTHENTICATE_USER,
  AUTHENTICATION_ERROR,
  REGISTER_NEW_USER,
} from "./Types";

const initialState = {
  loggedIn: false,
  token: () => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("token");
    } else {
      return null;
    }
  },
  loading: false,
  user: null,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case REGISTER_NEW_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case AUTHENTICATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
