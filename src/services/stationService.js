import http from "../services/httpService";

const apiEndPoint = "/station";

export function getStations() {
  return http.get(apiEndPoint);
}
