import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App";
import "ant-design-vue/dist/antd.css";
import axios from "axios";
import VueAxios from "vue-axios";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./components/FormYubipro.vue"),
  },
  {
    path: "/result/:id",
    name: "Result",
    component: () => import("./components/DataResultYubipro.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.use(Antd).mount("#app");
