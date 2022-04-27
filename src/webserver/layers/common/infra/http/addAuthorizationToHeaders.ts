import * as RuntimeCheck from "../../utils/check_runtime_environment";
import * as LocalStorage from "../../../client/hooks/local_storage_hook";
import * as Constants from "../../environment/constants";
import { log_exception } from "../../logger/logger";

export const addAuthorizationToHeaders: () => string = () => {
  if (RuntimeCheck.isBrowser()) {
    try {
      const jwt: string =
        LocalStorage.getItem(Constants.SESSION_KEY) || "";

      return jwt;
    } catch (err) {
      log_exception(`LocalStorage crashed `, err);
      return "";
    }
  }
  return "";
};