import { ObjectUtils } from "pangju-utils";

export class TokenUtils {
  static getAccessToken() {
    return `Bearer ${ObjectUtils.defaultIfNull(
      localStorage.getItem("accessToken"),
      ""
    )}`;
  }

  static getRefreshToken() {
    return `Bearer ${ObjectUtils.defaultIfNull(
      localStorage.getItem("refreshToken"),
      ""
    )}`;
  }

  static setToken(accessToken, refreshToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  static clearAccount() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}
