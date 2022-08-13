<template>
  <!--  <pj-bread-crumb v-slot="slotProps" :items="routes"></pj-bread-crumb>-->
  <pj-bread-crumb :items="routes"></pj-bread-crumb>
</template>

<script setup>
import PjBreadCrumb from "components/common/navigation/PjBreadCrumb.vue";
import { ref } from "vue";

const routes = ref(["ces", "cesadad"]);
</script>

<style scoped></style>
