import {
  TOGGLE_MODAL,
  SET_MODAL_CONTENT,
  MODAL_CONFIRMED,
  MODAL_DISMISSED,
  USER_ERROR_WITH_DIALOGUE,
  ERROR_WITH_MODAL,
  TOGGLE_LEFT_TAB,
} from "./TYPES";

const initialState = {
  modal: {
    modalText: "",
    modalHeader: "",
    isConfirmation: false,
  },
  leftTab: {
    isOpen: true,
  },
  errors: [],
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL_CONTENT:
      return {
        ...state,
        modal: {
          modalText: action.payload.text,
          modalHeader: action.payload.modalHeader,
          isConfirmation: action.payload.isConfirmation || false,
        },
        leftTab: { ...state.leftTab },
      };
    case TOGGLE_LEFT_TAB:
      return {
        ...state,
        modal: { ...state.modal },
        leftTab: {
          isOpen: !state.leftTab.isOpen,
        },
      };
    case ERROR_WITH_MODAL:
      action = {
        payload: {
          modalHeader: "Header",
          modalText: "Text goes here",
          isConfirmation: false,
        },
      };
      return {
        ...state,
        modal: {
          modalText: action.payload.modalText,
          modalHeader: action.payload.modalHeader,
          isConfirmation: action.payload.isConfirmation,
        },
        leftTab: { ...state.leftTab },
      };

    default:
      return state;
  }
}
