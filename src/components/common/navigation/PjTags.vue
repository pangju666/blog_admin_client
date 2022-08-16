<template>
  <el-tag
    v-for="(tag, index) in tags"
    :key="index"
    :class="getTagClass(tag, index)"
    :closable="readonly ? true : getCloseable(tag, index)"
    :color="color"
    :disable-transitions="disableTransitions"
    :effect="effect"
    :hit="hit"
    :round="round"
    :size="size"
    :style="{ cursor: readonly ? 'default' : cursor }"
    :type="type"
    @click="onBreadCrumbItemClick(tag, index)"
    @close="onBreadCrumbItemClose(tag, index)"
    @contextmenu="$emit('tag-contextmenu', $event, tag, index)"
  >
    <slot :index="index" :tag="tag" :tag-name="getTag(tag)">
      <span>
        {{ getTag(tag) }}
      </span>
    </slot>
  </el-tag>
</template>

<script setup>
import { ObjectUtils } from "pangju-utils";

const props = defineProps({
  tags: {
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
  type: {
    type: String,
    validator(value) {
      return ["success", "info", "warning", "danger"].includes(value);
    },
  },
  closable: {
    type: [Boolean, Function],
    default: false,
  },
  disableTransitions: {
    type: Boolean,
    default: false,
  },
  hit: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
  },
  size: {
    type: String,
    default: "default",
    validator(value) {
      return ["large", "default", "small"].includes(value);
    },
  },
  effect: {
    type: String,
    default: "light",
    validator(value) {
      return ["dark", "light", "plain"].includes(value);
    },
  },
  round: {
    type: Boolean,
    default: false,
  },
  tagClass: {
    type: [String, Function],
  },
});

const emits = defineEmits(["click-tag", "close-tag", "tag-contextmenu"]);

const getTag = (tag) => {
  if (typeof tag === "object") {
    return ObjectUtils.getProp(tag, props.valueKey, null);
  }
  return tag;
};
const getTagClass = (tag, index) => {
  if (ObjectUtils.isNull(props.tagClass)) {
    return "";
  }
  return typeof props.tagClass === "function"
    ? props.tagClass(tag, index)
    : props.tagClass;
};
const getCloseable = (tag, index) => {
  if (ObjectUtils.isNull(props.closable)) {
    return false;
  }
  return typeof props.closable === "function"
    ? props.closable(tag, index)
    : props.closable;
};

const onBreadCrumbItemClick = (tag, index) => {
  if (!props.readonly) {
    emits("click-tag", tag, index);
  }
};
const onBreadCrumbItemClose = (tag, index) => {
  if (!props.readonly) {
    emits("close-tag", tag, index);
  }
};
</script>

<style lang="less" scoped></style>
