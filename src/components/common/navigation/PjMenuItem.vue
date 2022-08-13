<template v-if="!item.hidden">
  <el-menu-item
    v-if="!item.children || item.children.length === 0"
    :disabled="item.disabled"
    :index="item.index"
    :route="item.route"
    @click="$emit('click', item)"
  >
    <template #title>
      <slot :item="item" name="title" />
    </template>
    <slot :item="item" />
  </el-menu-item>
  <el-sub-menu
    v-else
    :disabled="item.disabled"
    :hide-timeout="hideTimeout"
    :index="item.index"
    :popper-class="popperClass"
    :popper-offset="popperOffset"
    :show-timeout="showTimeout"
  >
    <template #title>
      <slot :item="item" name="sub-menu-title" />
    </template>
    <pj-menu-item
      v-for="child in item.children"
      :key="child.id"
      :hide-timeout="hideTimeout"
      :item="child"
      :popper-class="popperClass"
      :popper-offset="popperOffset"
      :show-timeout="showTimeout"
    >
      <template #title="scope">
        <slot :item="scope.item" name="title" />
      </template>
      <template #sub-menu-title="scope">
        <slot :item="scope.item" name="sub-menu-title" />
      </template>
      <template #default="scope">
        <slot :item="scope.item" />
      </template>
    </pj-menu-item>
  </el-sub-menu>
</template>

<script setup>
import { defineEmits } from "vue";

defineProps({
  item: {
    type: Object,
    required: true,
  },
  popperClass: {
    type: String,
  },
  popperOffset: {
    type: Number,
    default: 6,
  },
  showTimeout: {
    type: Number,
    default: 300,
  },
  hideTimeout: {
    type: Number,
    default: 300,
  },
});

defineEmits(["click"]);
</script>
