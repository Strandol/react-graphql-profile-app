import axios from "axios";
import { getToken } from "../utils";
import { API_URL } from "../config";

function apiRequest(req) {
  const url = API_URL + req.url;
  const token = getToken();

  if (!req.headers) req.headers = {};
  if (token) req.headers.Authorization = `JWT ${token}`;

  req.headers["Content-Type"] = "application/json";

  if (!req.params) req.params = {};
  if (!req.data) req.data = {};

  const axiosData = {
    method: req.method,
    url: url,
    headers: req.headers,
    params: req.params,
    data: req.data
  };

  const axiosRequest = axios(axiosData)
    .then(response => {
      const serverData = response.data.data;
      return serverData;
    })
    .catch(error => {
      throw error;
    });

  return axiosRequest;
}

export default apiRequest;
