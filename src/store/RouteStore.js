import { defineStore } from "pinia";

export const useRouteStore = defineStore("routeStore", {
  state: () => {
    return {
      currentRoute: [],
      routeMap: new Map(),
    };
  },
  actions: {
    setCurrentRoute(routeName) {
      this.currentRoute = this.routeMap.get(routeName);
    },
  },
});
