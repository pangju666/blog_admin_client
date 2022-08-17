<template>
  <div class="page-side-bar h-100">
    <div class="logo cursor-pointer">
      <img v-show="!collapse" src="@/assets/images/vite.svg" />
      <span v-show="!collapse">博客管理端</span>
      <el-icon
        :size="25"
        class="cursor-pointer menu-expand-icon"
        color="#fff"
        @click="onExpandChange"
      >
        <expand v-show="collapse" />
        <fold v-show="!collapse" />
      </el-icon>
    </div>
    <el-scrollbar noresize style="height: calc(100% - 50px)">
      <pj-route-menu
        :collapse="collapse"
        active-text-color="#409eff"
        background-color="transparent"
        collapse-width="64px"
        text-color="#bfcbd9"
      />
    </el-scrollbar>
  </div>
</template>

<script setup>
import PjRouteMenu from "components/common/navigation/PjRouteMenu.vue";
import { Expand, Fold } from "@element-plus/icons-vue";
import { ref } from "vue";

const emits = defineEmits(["expand-change"]);

const collapse = ref(false);

const onExpandChange = () => {
  collapse.value = !collapse.value;
  emits("expand-change", collapse.value);
};
</script>

<style lang="less" scoped>
.page-side-bar {
  background-color: #304156;

  .logo {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #2b2f3a;
    text-align: center;
    overflow: hidden;

    .menu-expand-icon {
      vertical-align: middle;
    }

    > img {
      vertical-align: middle;
      margin-right: 12px;
    }

    > span {
      display: inline-block;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      vertical-align: middle;
      margin-right: 12px;
    }
  }
}
</style>
