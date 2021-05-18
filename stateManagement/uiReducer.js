import {
  TOGGLE_MODAL,
  SET_MODAL_CONTENT,
  MODAL_CONFIRMED,
  MODAL_DISMISSED,
  USER_ERROR_WITH_DIALOGUE,
  ERROR_WITH_MODAL,
  TOGGLE_LEFT_TAB,
  TOGGLE_EDIT_STATE,
} from "./TYPES";

const initialState = {
  modal: {
    modalText: "",
    modalHeader: "",
    isConfirmation: false,
    isOpen: false,
  },
  leftTab: {
    isOpen: true,
  },
  isEditing: false,
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
    case TOGGLE_EDIT_STATE:
      return {
        ...state,
        modal: { ...state.modal },
        letTab: { ...state.leftTab },
        isEditing: !state.isEditing,
      };
    case TOGGLE_LEFT_TAB:
      return {
        ...state,
        modal: { ...state.modal },
        leftTab: {
          isOpen: !state.leftTab.isOpen,
        },
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modal: { ...state.modal, isOpen: !state.modal.isOpen },
        leftTab: { ...state.leftTab },
      };
    case ERROR_WITH_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          modalText: action.payload.modalText,
          modalHeader: action.payload.modalHeader,
          isConfirmation: action.payload.isConfirmation,
          isOpen: action.payload.isOpen,
        },
        leftTab: { ...state.leftTab },
      };

    default:
      return state;
  }
}
