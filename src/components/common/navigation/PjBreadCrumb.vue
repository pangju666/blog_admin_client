<template>
  <el-breadcrumb
    :separator="separator"
    :separator-icon="separatorIcon"
    class="breadcrumb"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in items" :key="index">
        <slot :index="index" :item="item">
          <span
            class="cursor-pointer"
            @click="$emit('click-item', item, index)"
            >{{ typeof item === "object" ? item[valueKey] : item }}</span
          >
        </slot>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
defineProps({
  separator: {
    type: String,
    default: "/",
  },
  separatorIcon: {
    type: [String, Object],
  },
  items: {
    type: Array,
    required: true,
  },
  valueKey: {
    type: String,
    default: "value",
  },
});

defineEmits(["click-item"]);
</script>

<style lang="less" scoped>
.breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}
</style>
