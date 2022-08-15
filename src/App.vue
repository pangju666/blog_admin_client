<template>
  <el-config-provider :locale="zhCn">
    <el-container class="wh-100">
      <el-aside
        :width="collapse ? sidebarCollapseWidth : sidebarWidth"
        class="h-100 container-aside"
      >
        <page-side-bar
          :collapse="collapse"
          :collapse-width="sidebarCollapseWidth"
        />
      </el-aside>
      <el-container class="h-100">
        <el-header class="p-0" height="60px">
          <page-header @change="collapse = $event" />
        </el-header>
        <el-main class="route-container">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
        <el-footer class="p-0" height="60px">
          <page-footer />
        </el-footer>
      </el-container>
    </el-container>
    <file-transfer-panel />
  </el-config-provider>
</template>

<script setup>
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import FileTransferPanel from "components/common/feedback/PjFileTransferPanel.vue";
import PageSideBar from "layout/PageSideBar.vue";
import PageFooter from "layout/PageFooter.vue";
import PageHeader from "layout/PageHeader.vue";
import { ref } from "vue";

let collapse = ref(false);
const sidebarWidth = "210px";
const sidebarCollapseWidth = "64px";
</script>

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

<style lang="less" scoped>
.container-aside {
  transition: width 0.28s;
}

.route-container {
  height: calc(100% - 120px);
  padding: 10px;
}
</style>
