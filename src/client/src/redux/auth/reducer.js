import { Map } from "immutable";
import { GET_USER_DATA_SUCCESS } from "./constants";

const initState = new Map({
  userData: {},
  isLoggedIn: false
});

export default (state = initState, action) => {
  switch (action.type) {
    case GET_USER_DATA_SUCCESS:
      return state.set("userData", action.payload).set("isLoggedIn", true);
    default:
      return state;
  }
};
