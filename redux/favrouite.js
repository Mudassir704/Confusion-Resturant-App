import * as ActionTypes from "./ActionTypes";

export const favrouites = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_FAVROUITE:
      if (state.some((el) => el === action.payload)) return state;
      else return state.concat(action.payload);
    case ActionTypes.DELETE_FAV:
      return state.filter((favrouite) => favrouite !== action.payload);
    default:
      return state;
  }
};
