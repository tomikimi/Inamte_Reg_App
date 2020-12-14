import _ from "lodash";

export const accusedData = [];
export const victimsData = [];
export const witnessData = [];

export function postAccusedData(data) {
  accusedData.push(data);
  return _.reverse(accusedData);
}

export function postVictimsData(data) {
  victimsData.push(data);
  return _.reverse(victimsData);
}

export function postWitnessData(data) {
  witnessData.push(data);
  return _.reverse(witnessData);
}
