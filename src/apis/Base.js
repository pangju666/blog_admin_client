import axios from "axios";
import { ObjectUtils } from "pangju-utils";
import { ElNotification } from "element-plus";

const apiConfig = {
  baseURL: `${process.env.VITE_APP_BASE_URL}`,
  // 请求超时时间设置
  timeout: 10 * 1000,
  crossDomain: true,
};

// 创建请求实例
const apiAxios = axios.create(apiConfig);
const CancelToken = axios.CancelToken;

let timeoutTimes = 0;

apiAxios.interceptors.request.use(
  (requestConfig) => {
    if (!requestConfig.url) {
      throw new Error("请求需要传入url");
    }

    if (requestConfig.method === "post") {
      let hasFile = false;
      for (let key of Object.keys(requestConfig.data)) {
        if (ObjectUtils.isBasicType(requestConfig.data[key])) {
          continue;
        }
        const item = requestConfig.data[key];
        if (ObjectUtils.isAnyType(item, FileList, File, Blob)) {
          hasFile = true;
          break;
        }
      }

      if (hasFile) {
        const formData = new FormData();
        Object.keys(requestConfig.data).forEach((key) => {
          if (ObjectUtils.nonNull(requestConfig.data[key])) {
            formData.append(key, requestConfig.data[key]);
          }
        });
        requestConfig.data = formData;
      }
    }

    return requestConfig;
  },
  (error) => {
    Promise.reject(error);
  }
);

apiAxios.interceptors.response.use(
  (response) => {
    timeoutTimes = 0;

    if (
      ["blob", "arraybuffer", "stream"].includes(response.config.responseType)
    ) {
      return response;
    }

    const resData = response.data;
    if (resData.code < 0) {
      ElNotification.error(resData.message);
      return false;
    } else if (ObjectUtils.isNull(resData.results)) {
      return true;
    }
    return resData.results;
  },
  async (error) => {
    if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
      if (timeoutTimes > 3) {
        timeoutTimes = 0;
        ElNotification.warning("请求超时, 请稍后重试");
        return;
      }
      ++timeoutTimes;
      return apiAxios(error.config);
    } else if (403 === error.response.status) {
      ElNotification.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export function post(url, data = {}, params = {}, headers = {}) {
  return apiAxios.post(url, data, { params, headers });
}

export function get(url, params = {}, headers = {}) {
  return apiAxios.get(url, { params, headers });
}

export function getDownload(
  url,
  params = {},
  onDownloadProgress = () => {},
  cancelToken
) {
  return apiAxios.get(url, {
    params,
    responseType: "blob",
    onDownloadProgress,
    cancelToken: cancelToken.token,
  });
}

export function postDownload(
  url,
  data = {},
  onDownloadProgress = () => {},
  cancelToken
) {
  return apiAxios.post(url, data, {
    responseType: "blob",
    onDownloadProgress,
    cancelToken: cancelToken.token,
  });
}

export function createCancelToken() {
  return CancelToken.source();
}
