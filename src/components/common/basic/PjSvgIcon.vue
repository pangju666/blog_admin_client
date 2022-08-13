<template>
  <svg :style="style" aria-hidden="true" class="svg-icon">
    <use :style="svgStyle" :xlink:href="svgName"></use>
  </svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  svgStyle: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 18,
  },
});

const svgName = computed(() => `#${props.icon}`);
const style = computed(() => `font-size: ${props.size}px`);
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
