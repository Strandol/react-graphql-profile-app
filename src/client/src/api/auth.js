import apiRequest from './index';
import { AUTH_ROUTE } from '../config/routes';

export const getUserData = () => {
  const req = {
    method: "POST",
    url: `${AUTH_ROUTE}/user`,
  }

  return apiRequest(req);
}