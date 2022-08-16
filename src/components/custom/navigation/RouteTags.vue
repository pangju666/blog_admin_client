<template>
  <el-scrollbar height="49px">
    <div class="tags-view">
      <pj-tags
        v-slot="scope"
        :closable="getCloseable"
        :tag-class="getTagClass"
        :tags="tags"
        value-key="meta.title"
        @click-tag="onClickTag"
        @tag-contextmenu="onTagContextmenu"
      >
        <span v-if="activeIndex === scope.index" class="round-icon"></span>
        <span>{{ scope.tagName }}</span>
      </pj-tags>
    </div>
  </el-scrollbar>
</template>

<script setup>
import PjTags from "components/common/navigation/PjTags.vue";
import { computed, onBeforeMount } from "vue";
import { useRouteStore } from "@/store/RouteStore.js";
import { useRouter } from "vue-router";

const router = useRouter();
const routeStore = useRouteStore();

defineProps({});

const tags = computed(() => routeStore.routeHistory);
const activeIndex = computed(() => routeStore.currentRouteIndex);

onBeforeMount(() => {
  routeStore.setCurrentRoute({ meta: { title: "首页" }, path: "/index" });
});

const getTagClass = (tag, index) => {
  return index === activeIndex.value
    ? "route-tag active-route-tag"
    : "route-tag";
};
const getCloseable = (tag) => {
  return tag.path !== "/index";
};

const onClickTag = (item) => {
  router.push(item.path);
};

// eslint-disable-next-line no-unused-vars
const onTagContextmenu = (event, tag, index) => {};
</script>

<style lang="less" scoped>
.tags-view {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  width: 100%;
}

.round-icon {
  content: "";
  background: #fff;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 2px;
}
</style>

<style lang="less">
.route-tag {
  --el-tag-border-radius: 0;
  --el-tag-text-color: #495060;
  --el-tag-border-color: #d8dce5;
  --el-tag-bg-color: #fff;
  --el-tag-font-size: 12px;
  --el-icon-size: 16px;
  height: 26px;
  line-height: 26px;
  padding: 0 8px;
  margin-left: 5px;
  margin-top: 4px;
}

.active-route-tag {
  --el-tag-bg-color: #42b983 !important;
  --el-tag-text-color: #fff !important;
  --el-tag-border-color: #42b983 !important;
}
</style>
