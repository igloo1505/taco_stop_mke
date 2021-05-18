import {
  AUTHENTICATE_USER,
  AUTHENTICATION_ERROR,
  REGISTER_NEW_USER,
  GET_ALL_USERS,
  USER_ERROR,
  ERROR_WITH_MODAL,
} from "./TYPES";

const initialState = {
  loggedIn: true,
  token: () => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("token");
    } else {
      return null;
    }
  },
  allUsers: [],
  loading: false,
  user: {
    token: 1,
    _id: null,
    userName: "",
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
          _id: action.payload.userID,
          userName: action.payload.userName,
        },
      };

    case GET_ALL_USERS:
      return {
        ...state,
        user: { ...state.user },
        allUsers: action.payload.user,
      };
    case USER_ERROR:
      return {
        ...state,
        user: { ...state.user },
        error: action.payload,
      };
    case REGISTER_NEW_USER:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        allUsers: [...state.allUsers, action.payload._doc],
        user: {
          token: action.payload.token,
          _id: action.payload._doc._id,
          userName: action.payload._doc.userName,
        },
      };
    case AUTHENTICATION_ERROR:
      return {
        ...state,
        // loggedIn: false,
        allUsers: [],
        loading: false,
        user: { ...state.user },
        error: action.payload,
      };
    case ERROR_WITH_MODAL:
      return {
        ...state,
        // loggedIn: false,
        allUsers: [],
        loading: false,
        user: { ...state.user },
        error: action.payload,
      };
    default:
      return state;
  }
}
