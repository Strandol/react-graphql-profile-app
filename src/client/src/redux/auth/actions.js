import { GET_USER_DATA } from "./constants";

export const getUserData = token => {
  return {
    type: GET_USER_DATA,
    token
  };
};
