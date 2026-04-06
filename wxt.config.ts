import { defineConfig } from "wxt";

export default defineConfig({
  manifest: {
    action: {},
    description: "Share the current page URL or selected text to X from the context menu.",
    name: "Post on X",
    permissions: ["activeTab", "contextMenus", "tabs"],
  },
  modules: ["@wxt-dev/module-react"],
});
