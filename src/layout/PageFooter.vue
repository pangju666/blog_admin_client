<template>
  <div class="wh-100 page-footer">
    <el-link
      :underline="false"
      class="page-footer-link"
      href="https://github.com/pangju666/blog_admin_client"
      target="_blank"
    >
      <pj-svg-icon :size="16" icon="icon-github" />
    </el-link>
    <span>©2022</span>
    <el-link
      :underline="false"
      class="page-footer-link"
      href="https://beian.miit.gov.cn/"
      target="_blank"
    >
      <span> 陕ICP备2022003485号-1 </span></el-link
    >
  </div>
</template>

<script setup></script>

<script>
import PjSvgIcon from "components/common/basic/PjSvgIcon.vue";

export default {
  components: { PjSvgIcon },
};
</script>
<style lang="less" scoped>
.page-footer {
  background-color: #eff2f5;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 16px;
  font-weight: 300;

  > * {
    margin-right: 15px;
  }

  .page-footer-link {
    font-size: 16px;
    font-weight: 300;
    color: #959595;
  }
}
</style>
