import http from "./httpService";

const apiEndPoint = "/auth";

export function loginUser(user) {
  return http.post(apiEndPoint, {
    email: user.username,
    password: user.password,
  });
}
