<template>
  <el-menu-item
    v-if="!item.children || item.children.length === 0"
    :disabled="item.disabled"
    :index="item.id.toString()"
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
    :index="item.id.toString()"
    popper-append-to-body
  >
    <template #title>
      <slot :item="item" name="sub-menu-title" />
    </template>
    <pj-menu-item v-for="child in item.children" :key="child.id" :item="child">
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
defineProps({
  item: {
    type: Object,
    required: true,
  },
  color: {
    type: String,
  },
  size: {
    type: Number,
  },
});

defineEmits(["click"]);
</script>
