<template>
  <div>
    <el-config-provider :locale="zhCn">
      <router-view/>
    </el-config-provider>
    <file-transfer-panel/>
  </div>
</template>

<script setup>
import {ElConfigProvider} from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import FileTransferPanel from "components/common/feedback/FileTransferPanel.vue";</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
