import apiRequest from './index';

export const getUserData = () => {
  const req = {
    method: "POST",
    url: "/login",
  }

  return apiRequest(req);
}