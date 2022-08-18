<template>
  <el-config-provider :locale="zhCn">
    <router-view v-slot="{ Component, route }">
      <component :is="Component" v-if="route.meta.fullScreen" />
      <div v-else class="container">
        <div class="container-aside">
          <page-side-bar @expand-change="collapse = $event" />
        </div>
        <div class="container-header">
          <page-header />
        </div>
        <div class="container-body">
          <transition mode="out-in" name="el-fade-in-linear">
            <keep-alive>
              <el-scrollbar class="wh-100" height="100%">
                <component :is="Component" />
              </el-scrollbar>
            </keep-alive>
          </transition>
        </div>
      </div>
      <file-transfer-panel />
    </router-view>
  </el-config-provider>
</template>

<script setup>
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import FileTransferPanel from "components/common/feedback/PjFileTransferPanel.vue";
import PageSideBar from "layout/PageSideBar.vue";
import PageHeader from "layout/PageHeader.vue";
import { computed, ref } from "vue";

let collapse = ref(false);
const sidebarWidth = computed(() => {
  return collapse.value ? "64px" : "210px";
});
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
.container {
  width: 100%;
  height: 100%;

  .container-aside {
    position: fixed;
    overflow: hidden;
    height: 100%;
    width: v-bind(sidebarWidth);
    z-index: 1000;
  }

  .container-header {
    position: fixed;
    left: v-bind(sidebarWidth);
    height: 90px;
    width: calc(100% - v-bind(sidebarWidth));
    z-index: 1000;
  }

  .container-body {
    position: relative;
    left: v-bind(sidebarWidth);
    overflow: hidden;
    width: calc(100% - v-bind(sidebarWidth));
    top: 90px;
    height: calc(100% - 90px);
    background-color: #f1f5fb;
    padding: 20px;
  }
}
</style>
