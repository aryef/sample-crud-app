import { IObjectKeys } from "../interface/IObjectKeys";

export const getKeyValue = function <T extends IObjectKeys, U extends keyof T>(obj: T, key: U) {
  return (obj[key]);
};