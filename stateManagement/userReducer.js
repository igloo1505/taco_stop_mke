import {
  AUTHENTICATE_USER,
  AUTHENTICATION_ERROR,
  REGISTER_NEW_USER,
} from "./Types";

const initialState = {
  loggedIn: true,
  token: () => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("token");
    } else {
      return null;
    }
  },
  loading: false,
  user: {
    token: 1,
    id: null,
  },
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        user: {
          token: action.payload.token,
          id: action.payload.userID,
        },
      };
    case REGISTER_NEW_USER:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        user: action.payload,
      };
    case AUTHENTICATION_ERROR:
      return {
        ...state,
        loggedIn: false,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
