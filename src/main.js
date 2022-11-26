import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/base.css";
import store from "./store";

const app = createApp(App);

const components = import.meta.globEager("./components/**/*.vue");

Object.entries(components).forEach(([path, definition]) => {
  const componentName = path
    .split("/")
    .pop()
    .replace(/\.\w+$/, "");
  app.component(componentName, definition.default);
});

app.use(router);
app.use(store);
app.mount("#app");
export default app;
