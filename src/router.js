import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Home from "./components/Home.vue";
import Topic from "./components/Topic.vue";
import Top from "./components/Top.vue";
import CreatTopic from "./components/CreatTopic.vue";
import Xiaoxi from "./components/Xiaoxi.vue";
const routes = [
  {
    component: Home,
    path: "/"
  },
  {
    component: Xiaoxi,
    path: "/messages"
  },
  {
    component: CreatTopic,
    path: "/topic/creat"
  },
  {
    component: Topic,
    path: "/topic/:id"
  },
  {
    component: Top,
    path: "/user/:id"
  }
];
const router = new VueRouter({
  routes,
  mode: "history"
});
export default router;
