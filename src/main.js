import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Pagination } from "element-ui";
Vue.use(Pagination);
Vue.config.productionTip = false;
import PUBLICURL from "./public";
Vue.prototype.$publicUrl = PUBLICURL;
new Vue({
  render: h => h(App),
  router
}).$mount("#app");
