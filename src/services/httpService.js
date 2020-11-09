import { Toast } from "react-toastify";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const errorResponse =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  if (!errorResponse) {
    Toast.error("An error occured");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
