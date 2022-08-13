<template>
  <svg :style="style" aria-hidden="true" class="svg-icon">
    <use :style="svgStyle" :xlink:href="svgName"></use>
  </svg>
</template>

<script>
export default {
  name: "PjSvgIcon",
  props: {
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
  },
  computed: {
    svgName() {
      return `#${this.icon}`;
    },
    style() {
      return `font-size: ${this.size}px`;
    },
  },
};
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
