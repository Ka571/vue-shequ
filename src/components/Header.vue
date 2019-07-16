<template>
  <div class="header">
    <div class="header-inner">
      <router-link to="/" class="logo">
        <img src="https://www.vue-js.com/public/images/vue.png" alt />
        <h1>Vue.js</h1>
      </router-link>
      <ul class="kk">
        <li>首页</li>
        <router-link :to="`${$publicUrl}/messages`" tag="li">
          <span>{{hasnot_read_messages.length}}</span>
          <span>未读信息</span>
        </router-link>
        <li>微信公众号</li>
        <li>Vue 2.0</li>
        <li>参考资料</li>
        <li>API</li>
        <li>关于</li>
        <li>设置</li>
      </ul>
      <div v-if="!user">
        <input type="text" v-model="text" />
        <button @click="login">登录</button>
      </div>
      <div class="logout" v-else>
        <router-link :to="`${$publicUrl}/topic/creat`">
          <span>发布话题</span>
        </router-link>

        <img :src="user.avatar_url" alt />
        <button @click="logout">退出</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "hed",
  data() {
    return {
      text: "1e8095f8-35fe-459e-a66c-e0c3dcaf1615",
      user: null,
     
      hasnot_read_messages: []
    };
  },
  created() {
    if (sessionStorage.getItem("token")) {
      axios
        .post("https://www.vue-js.com/api/v1/accesstoken", {
          accesstoken: sessionStorage.getItem("token")
        })
        .then(res => {
          this.user = res.data;
        });
    }
    axios
      .get(
        `https://www.vue-js.com/api/v1/messages?accesstoken=${sessionStorage.getItem(
          "token"
        )}`
      )
      .then(res => {
        console.log(res.data.data);
        // this.has_read_messages = res.data.data.has_read_messages;
        this.hasnot_read_messages = res.data.data.hasnot_read_messages;
      });
  },
  methods: {
    login() {
      axios
        .post("https://www.vue-js.com/api/v1/accesstoken", {
          accesstoken: this.text
        })
        .then(res => {
          this.user = res.data;
          sessionStorage.setItem("token", this.text);
          sessionStorage.setItem("user_id", res.data.id);
          // console.log(res.data);
        });
    },
    logout() {
      axios
        .post("https://www.vue-js.com/api/v1/accesstoken", {
          accesstoken: this.text
        })
        .then(res => {
          this.user = null;
          sessionStorage.removeItem("token", this.text);
        });
    }
  }
};
</script>

<style>
.logo {
  flex-shrink: 0;
}
.header {
  width: 100%;
  height: 55px;
  background-color: #1c6132;
  /* margin-bottom: 20px; */
}
.header-inner {
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-inner > .logo {
  display: flex;
  align-items: center;
  height: 55px;
  color: #fff;
}
.header-inner > .logo > img {
  width: 45px;
  height: 45px;
  margin-right: 10px;
}
.header-inner > .logo > h1 {
  margin: 0;
}

.logout > img {
  width: 40px;
}
.logout {
  display: flex;
  align-items: center;
}
.kk {
  display: flex;
  color: white;
}
.kk > li {
  line-height: 55px;
  padding: 0 10px;
}
</style>
