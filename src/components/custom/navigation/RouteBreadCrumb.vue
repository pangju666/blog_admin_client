<template>
  <!--  <pj-bread-crumb v-slot="slotProps" :items="routes"></pj-bread-crumb>-->
  <pj-bread-crumb :items="routes"></pj-bread-crumb>
</template>

<script setup>
import PjBreadCrumb from "components/common/navigation/PjBreadCrumb.vue";
import { onMounted, ref } from "vue";

const route = ref("首页");

const routes = ref([route, ...["ces", "cesadad"]]);

// eslint-disable-next-line no-unused-vars
const looseJsonParse = (object, key) => {
  let props = key;
  if (!Array.isArray(key)) {
    props = props.replace(/\[/g, ".").replace(/]/g, "").split(".");
  }
  return props.reduce((value, prop) => value[prop], object);
};

onMounted(() => {
  const obj = { meta: { title: "ceshi" } };
  console.log(looseJsonParse(obj, "meta.title"));
});
</script>

<style scoped></style>
