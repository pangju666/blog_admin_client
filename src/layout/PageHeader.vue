<template>
  <div class="h-100">
    <div class="page-navbar">
      <route-bread-crumb />
      <div class="right-navbar">
        <el-icon :size="25" class="full-screen-icon cursor-pointer">
          <full-screen />
        </el-icon>
        <el-dropdown trigger="click">
          <span class="cursor-pointer display-flex">
            <el-avatar :icon="User" class="avatar" shape="square" />
            <span class="h-100 dropdown-icon">
              <el-icon :size="12" class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
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
    <route-tags class="route-tags" />
  </div>
</template>

<script setup>
import { ArrowDown, FullScreen, User } from "@element-plus/icons-vue";
import RouteBreadCrumb from "components/custom/navigation/RouteBreadCrumb.vue";
import RouteTags from "components/custom/navigation/RouteTags.vue";
</script>

<style lang="less" scoped>
.page-navbar {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  overflow: hidden;
  background: #fff;

  .right-navbar {
    display: flex;
    align-items: center;
    margin-right: 30px;

    .avatar {
      --el-avatar-border-radius: 10px;
    }

    .full-screen-icon {
      margin-right: 16px;
    }

    .dropdown-icon {
      display: flex;
      align-items: flex-end;
      padding-bottom: 5px;
    }
  }
}

.route-tags {
  height: 40px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
}
</style>
