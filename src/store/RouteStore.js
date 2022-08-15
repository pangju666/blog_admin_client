import { defineStore } from "pinia";
import { ArrayUtils } from "pangju-utils";

export const useRouteStore = defineStore("routeStore", {
  state: () => {
    return {
      currentRoute: null,
      currentRouteIndex: 0,
      routeHistory: [],
    };
  },
  getters: {},
  actions: {
    setCurrentRoute(currentRoute) {
      this.currentRoute = currentRoute;
      const index = ArrayUtils.indexOf(
        this.routeHistory,
        (route) => route.path === currentRoute.path
      );
      if (index !== -1) {
        this.currentRouteIndex = index;
      } else {
        this.currentRouteIndex = this.routeHistory.length;
        this.routeHistory.push(currentRoute);
      }
    },
    removeRouteHistory(index) {
      this.routeHistory.splice(index, 1);
    },
  },
});
