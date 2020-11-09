import http from "../services/httpService";

const apiEndPoint = "/inmate";

export function saveInmateRecord(data) {
  return http.post(apiEndPoint, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function getInmateRecord() {
  return http.get(apiEndPoint);
}
