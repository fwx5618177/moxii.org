import { ActionTypes } from "Reducer";
import { initialTocState } from "./initialTocState";

export const tocReducer = (state = initialTocState, action: ActionTypes) => {
  switch (action.type) {
    case "ADD_TO_TOC":
      return {
        ...state,
        toc: [...state.toc, action.payload],
      };
    case "ADD_MULTIPLE_TOC":
      return {
        ...state,
        toc: [...state.toc, ...action.payload],
      };
    case "REMOVE_FROM_TOC":
      return {
        ...state,
        toc: state.toc.filter((item) => item.key !== action.payload),
      };
    case "CLEAR_TOC":
      return {
        ...state,
        toc: [],
      };
    default:
      return state;
  }
};
