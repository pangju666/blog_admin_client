/* eslint-disable no-undef */
import Vue from "@vitejs/plugin-vue";
import Compression from "vite-plugin-compression";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import ElementPlus from "unplugin-element-plus/vite";
import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig({
  plugins: [
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, "src/assets/icons")],
      symbolId: "blog-icon-[name]",
      svgoOptions: true,
    }),
    VueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus(),
    Vue(),
    Compression({
      ext: ".gz",
      deleteOriginFile: false,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      components: path.resolve(__dirname, "src/components"),
      views: path.resolve(__dirname, "src/views"),
      layout: path.resolve(__dirname, "src/layout"),
      apis: path.resolve(__dirname, "src/apis"),
      assets: path.resolve(__dirname, "src/assets"),
      utils: path.resolve(__dirname, "src/utils"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
});
