<template>
  <el-card v-show="visible" class="transfer-panel">
    <template #header>
      <div>
        <span>传输面板</span>
        <el-icon class="float-right cursor-pointer" @click="visible">
          <close />
        </el-icon>
      </div>
    </template>
    <el-table :data="fileList" :fit="false" height="250">
      <el-table-column label="文件名" prop="fileName" width="180" />
      <el-table-column label="进度条" prop="progress" width="180">
        <template #default="{ row }">
          <el-progress :percentage="row.progress" />
        </template>
      </el-table-column>
      <el-table-column label="传输类型" prop="type" width="120" />
      <el-table-column label="状态" prop="status" width="120" />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button
            class="cancel-button"
            size="small"
            type="danger"
            @click="cancel(row)"
            >取消
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { useFileTransferStore } from "@/store/FileTransferStore.js";
import { Close } from "@element-plus/icons-vue";
import { computed } from "vue";

const store = useFileTransferStore();

const fileList = computed(() => store.fileList);
const visible = computed({
  get: () => store.visible,
  set: (value) => {
    store.visible = value;
  },
});

const cancel = (row) => {
  store.cancelDownload(row.cancel, row.fileId);
};
</script>

<style lang="less" scoped>
.transfer-panel {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 10000;
}
</style>
