import { Map } from "immutable";
import { GET_USER_DATA_SUCCESS, GET_USER_DATA_ERROR } from "./constants";

const initState = new Map({
  userData: {},
  isLoggedIn: false,
  isLoading: true,
  errorMessage: ""
});

export default (state = initState, action) => {
  switch (action.type) {
    case GET_USER_DATA_SUCCESS:
      return state
        .set("userData", action.payload)
        .set("isLoggedIn", true)
        .set("errorMessage", "")
        .set("isLoading", false);
    case GET_USER_DATA_ERROR:
      return state
        .set("userData", {})
        .set("isLoggedIn", false)
        .set("errorMessage", action.payload)
        .set("isLoading", false);
    default:
      return state;
  }
};
