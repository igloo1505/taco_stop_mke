import {
  SET_LOADING,
  GET_RECIPES,
  RECIPE_ERROR,
  TOGGLE_STOCK,
  ADD_MENU_ITEM,
  REMOVE_MENU_ITEM,
  EDIT_MENU_ITEM,
} from "./Types";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
