import { defineStore } from "pinia";

export const useRouteStore = defineStore("routeStore", {
  state: () => {
    return {
      currentRoute: null,
      routeHistory: [],
    };
  },
  getters: {},
  actions: {},
});
