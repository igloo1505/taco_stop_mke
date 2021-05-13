import {
  SET_LOADING,
  GET_RECIPES,
  RECIPE_ERROR,
  TOGGLE_STOCK,
  ADD_MENU_ITEM,
  REMOVE_MENU_ITEM,
  EDIT_MENU_ITEM,
} from "./Types";

const initialState = {
  token: () => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("token");
    } else {
      return null;
    }
  },
  loading: false,
  recipes: [],
  error: null,
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_MENU_ITEM:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
        loading: false,
      };

    default:
      return state;
  }
};

export default recipeReducer;
