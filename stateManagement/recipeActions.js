import {
  SET_LOADING,
  GET_RECIPES,
  RECIPE_ERROR,
  TOGGLE_STOCK,
  ADD_MENU_ITEM,
  REMOVE_MENU_ITEM,
  EDIT_MENU_ITEM,
} from "./TYPES";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getAllRecipes = () => async (dispatch) => {
  console.log("Running getAllRecipes");
  try {
    const res = await axios.get("/api/portal/recipes", config);
    dispatch({
      type: GET_RECIPES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: RECIPE_ERROR,
      payload: error,
    });
  }
};

export const addNewRecipe = (recipe) => async (dispatch) => {
  console.log("Recipe in action file", recipe);
  try {
    const res = await axios.post(
      "/api/portal/recipes/newRecipe",
      recipe,
      config
    );
    dispatch({
      type: ADD_MENU_ITEM,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: RECIPE_ERROR,
      payload: error,
    });
  }
};
