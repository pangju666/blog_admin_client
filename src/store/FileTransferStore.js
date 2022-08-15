import { nanoid } from "nanoid";
import { createCancelToken, getDownload } from "apis/Base.js";
import fileDownload from "js-file-download";
import { ObjectUtils } from "pangju-utils";
import { defineStore } from "pinia";

export const useFileTransferStore = defineStore("fileTransferStore", {
  state: () => {
    return {
      visible: false,
      fileList: [],
    };
  },
  actions: {
    removeById(id) {
      setTimeout(() => {
        this.fileList = this.fileList.filter((file) => file.fileId !== id);
        if (this.fileList.length === 0) {
          this.visible = false;
        }
      }, 3000);
    },
    uploadFile(data) {
      this.visible = true;

      const file = this.fileList.find((file) => file.fileId === data.fileId);
      if (ObjectUtils.nonNull(file)) {
        file.progress = data.progress;
        if (data.progress === 100) {
          file.status = "上传完成";
          this.removeById(data.fileId);
        } else {
          file.status = "上传中";
        }
      } else {
        data.type = "上传";
        if (data.progress === 100) {
          data.status = "上传完成";
          this.removeById(data.fileId);
        } else {
          data.status = "准备上传";
        }
        this.fileList.push(file);
      }
    },
    downloadFile(fileUrl, fileName) {
      this.visible = true;

      const cancelToken = createCancelToken();
      const fileId = nanoid();
      this.fileList.push({
        fileId: fileId,
        fileName: fileName,
        progress: 0,
        type: "下载",
        status: "准备下载",
        cancel: cancelToken,
      });
      const file = this.fileList.find((file) => file.fileId === fileId);

      getDownload(
        fileUrl,
        {},
        (progress) => {
          const downProgress = Math.round(
            (100 * progress.loaded) / progress.total
          );
          file.progress = downProgress;
          if (downProgress === 100) {
            file.status = "下载完成";
            this.removeById(fileId);
          } else {
            file.status = "下载中";
          }
        },
        cancelToken
      ).then((res) => {
        fileDownload(res.data, fileName);
      });
    },
    cancelDownload(cancelToken, fileId) {
      cancelToken.cancel("暂停下载");
      this.removeById(fileId);
      if (this.fileList.length === 0) {
        this.visible = false;
      }
    },
  },
});
