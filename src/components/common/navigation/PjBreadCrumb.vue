<template>
  <el-breadcrumb :separator="separator" :separator-icon="separatorIcon">
    <el-breadcrumb-item v-for="(item, index) in items" :key="index">
      <slot :index="index" :item="item">
        <span
          :style="{ cursor: cursor }"
          @click="onBreadCrumbItemClick(item, index)"
          >{{ typeof item === "object" ? getBreadCrumbItem(item) : item }}</span
        >
      </slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { ObjectUtils } from "pangju-utils";

const props = defineProps({
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
  cursor: {
    type: String,
    default: "pointer",
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["click-item"]);

const getBreadCrumbItem = (item) =>
  ObjectUtils.getProp(item, props.valueKey, null);

const onBreadCrumbItemClick = (item, index) => {
  if (!props.readonly) {
    emits("click-item", item, index);
  }
};
</script>

<style lang="less" scoped></style>
