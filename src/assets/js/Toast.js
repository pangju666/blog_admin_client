import { ElMessageBox } from "element-plus";
import { ObjectUtils } from "pangju-utils";
import {
  CircleCheck,
  CircleClose,
  InfoFilled,
  Warning,
} from "@element-plus/icons-vue";
import { markRaw } from "vue";

export class Toast {
  static success(message, callback, errorCallback) {
    messageBox("success", CircleCheck, message, callback, errorCallback);
  }

  static error(message, callback, errorCallback) {
    messageBox("error", CircleClose, message, callback, errorCallback);
  }

  static warning(message, callback, errorCallback) {
    messageBox("warning", Warning, message, callback, errorCallback);
  }

  static info(message, callback, errorCallback) {
    messageBox("info", InfoFilled, message, callback, errorCallback);
  }
}

function messageBox(type, icon, message, cb, error) {
  ElMessageBox({
    type: type,
    title: "",
    icon: markRaw(icon),
    message: message,
    customClass: "Toast",
    showConfirmButton: false,
    showClose: true,
  })
    .then(() => {
      if (ObjectUtils.nonNull(cb) && typeof cb === "function") {
        cb();
      }
    })
    .catch(() => {
      if (ObjectUtils.nonNull(error) && typeof error === "function") {
        error();
      }
    });
}
