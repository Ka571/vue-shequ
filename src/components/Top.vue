<template>
  <div class="wai">
    <div v-if="user" class="hed">
      <div class="tp">
        <h2>
          主页
          <span>/</span>
        </h2>
        <div class="pic">
          <img :src="user.avatar_url" alt />
          <p>{{user.loginname}}</p>
        </div>
        <p>
          {{user.score}}
          <span>积分</span>
        </p>
        <h3>
          注册于
          <span>{{myMoment(user.create_at)}}</span>
        </h3>
      </div>
      <div class="main">
        <p>最近创建的话题</p>
        <ul class="titi">
          <li v-for="topic in user.recent_topics" :key="topic.id">
            <img :src="topic.author.avatar_url" alt />

            <h2>{{topic.title}}</h2>
            <span>{{myMoment(topic.last_reply_at)}}</span>
          </li>
        </ul>
      </div>
      <div class="main">
        <p>最近参与的话题</p>
        <ul class="titi">
          <li v-for="topic in user.recent_replies" :key="topic.id">
            <router-link class="ok" :to="`/user/${topic.author.loginname}`">
              <img :src="topic.author.avatar_url" alt />
            </router-link>
            <h2>{{topic.title}}</h2>
            <span>{{myMoment(topic.last_reply_at)}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "to",
  data() {
    return {
      user: null
    };
  },
  // created() {
  //   const { id } = this.$route.params;
  //   axios.get(`https://www.vue-js.com/api/v1/user/${id}`).then(res => {
  //     this.user = res.data.data;
  //     console.log(res.data.data);
  //   });
  // },
  watch: {
    "$route.fullPath": {
      immediate: true,
      handler() {
        const { id } = this.$route.params;
        axios.get(`https://www.vue-js.com/api/v1/user/${id}`).then(res => {
          this.user = res.data.data;
          console.log(res.data.data);
        });
      }
    }
  },
  methods: {
    myMoment(time) {
      moment.locale("zh-cn");
      return moment(time).fromNow();
    }
  }
};
</script>

<style>
.wai {
  width: 100%;
  background-color: rgba(194, 184, 184, 0.685);
  padding-top: 15px;
}
.hed {
  width: 80%;
  margin: 0 auto;
}
.tp {
  margin-bottom: 13px;
  background-color: #fff;
  padding: 10px;
}
.tp > p {
  margin-bottom: 18px;
}
.tp > h2 {
  padding: 10px 0;
  font-size: 14px;
  color: #369219;
}
.tp > h3 {
  color: #ababab;
  font-size: 14px;
}
/* 
body,
input,
p,
textarea {
  font-size: 14px;
} */
.pic {
  display: flex;
  align-items: inherit;
  margin-bottom: 10px;
}
.pic img {
  width: 40px;
  height: 40px;
  margin-right: 15px;
}
.pic p {
  font-size: 14px;
}
.titi > li {
  display: flex;
  align-items: center;
  padding: 10px 0;
}
.ok > img {
  width: 30px;
  height: 30px;
}
.titi > li > img {
  width: 30px;
  height: 30px;
  /* */
  flex-shrink: 0;
}
.titi > li > h2 {
  font-size: 14px;
  flex-grow: 1;
  padding-left: 10px;
  font-weight: normal;
  color: #08c;
}
.main {
  padding: 10px 10px;
  background-color: #fff;
  margin-bottom: 13px;
}
</style>
