import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Home from "./components/Home.vue";
import Topic from "./components/Topic.vue";
import Top from "./components/Top.vue";
import CreatTopic from "./components/CreatTopic.vue";
import Xiaoxi from "./components/Xiaoxi.vue";
import PUBLIC from "./public";
const routes = [
  {
    component: Home,
    path: PUBLIC + "/"
  },
  {
    component: Xiaoxi,
    path: PUBLIC + "/messages"
  },
  {
    component: CreatTopic,
    path: PUBLIC + "/topic/creat"
  },
  {
    component: Topic,
    path: PUBLIC + "/topic/:id"
  },
  {
    component: Top,
    path: PUBLIC + "/user/:id"
  }
];
const router = new VueRouter({
  routes,
  mode: "history"
});
export default router;
