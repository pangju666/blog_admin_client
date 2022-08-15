<template>
  <el-breadcrumb :separator="separator" :separator-icon="separatorIcon">
    <el-breadcrumb-item
      v-for="(item, index) in items"
      :key="index"
      :class="getItemClass(item, index)"
      :style="{ cursor: readonly ? 'default' : cursor }"
      @click="onBreadCrumbItemClick(item, index)"
    >
      <slot :index="index" :item="item" :item-name="getItem(item)">
        <span>{{ getItem(item) }}</span>
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
  itemClass: {
    type: [String, Function],
  },
});

const emits = defineEmits(["click-item"]);

const getItem = (item) => {
  if (typeof item === "object") {
    return ObjectUtils.getProp(item, props.valueKey, null);
  }
  return item;
};
const getItemClass = (item, index) => {
  if (ObjectUtils.isNull(props.itemClass)) {
    return "";
  }
  return typeof props.itemClass === "function"
    ? props.itemClass(item, index)
    : props.itemClass;
};

const onBreadCrumbItemClick = (item, index) => {
  if (!props.readonly) {
    emits("click-item", item, index);
  }
};
</script>

<style lang="less" scoped></style>
