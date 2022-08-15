<template>
  <div>
    <div class="page-header">
      <div class="flex-center">
        <div>
          <el-icon :size="25" class="cursor-pointer" @click="onExpandChange">
            <expand v-show="!expandStatus" />
            <fold v-show="expandStatus" />
          </el-icon>
        </div>
        <route-bread-crumb />
      </div>
      <div class="flex-center">
        <el-icon :size="25">
          <full-screen />
        </el-icon>
        <el-dropdown>
          <span class="el-dropdown-link">
            Dropdown List
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item disabled>Action 4</el-dropdown-item>
              <el-dropdown-item divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <route-tags />
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { ArrowDown, Expand, Fold, FullScreen } from "@element-plus/icons-vue";
// eslint-disable-next-line no-unused-vars
import RouteBreadCrumb from "components/custom/navigation/RouteBreadCrumb.vue";
import { ref } from "vue";
import RouteTags from "components/custom/navigation/RouteTags.vue";

const expandStatus = ref(false);

const emits = defineEmits(["change"]);

const onExpandChange = () => {
  expandStatus.value = !expandStatus.value;
  emits("change", expandStatus.value);
};
</script>

<style lang="less" scoped>
.page-header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
