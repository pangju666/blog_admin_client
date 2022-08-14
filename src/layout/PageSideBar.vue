<template>
  <el-scrollbar class="page-side-bar" height="100%" noresize>
    <pj-route-menu
      :collapse="collapse"
      :collapse-width="collapseWidth"
      active-text-color="#409eff"
      background-color="transparent"
      text-color="#bfcbd9"
    />
  </el-scrollbar>
</template>

<script setup>
import PjRouteMenu from "components/common/navigation/PjRouteMenu.vue";

defineProps({
  collapse: {
    type: Boolean,
    default: false,
  },
  collapseWidth: {
    type: String,
    default: "64px",
  },
});
</script>

<style lang="less" scoped>
.page-side-bar {
  background-color: #304156;
}
</style>
