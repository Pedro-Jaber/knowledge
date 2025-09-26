import { defaultError, defaultSuccess } from "./config/msgs";

export const userKey = "__knowledge_user";
export const baseUrl = "http://localhost:3000";

export function showError(e) {
  if (e?.response?.data) {
    defaultError({ msg: e.response.data });
  } else if (typeof e === "string") {
    defaultError({ msg: e });
  } else {
    defaultError();
  }
}

export function showSuccess(msg) {
  defaultSuccess({ msg });
}
