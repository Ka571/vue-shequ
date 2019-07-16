<template>
  <div class="box2">
    <div class="home">
      <ul class="nav">
        <li>
          <router-link
            :to="`${$publicUrl}/?tab=all`"
            @click.native="total=856"
            :class="$route.fullPath===$publicUrl+'/'||$route.fullPath===$publicUrl+'/?tab=all'?'active':''"
          >全部</router-link>
        </li>
        <li>
          <router-link
            @click.native="total=15"
            :to="`${$publicUrl}/?tab=good`"
            :class="$route.fullPath===$publicUrl+'/?tab=good'?'active':''"
          >精华</router-link>
        </li>
        <li>
          <router-link
            :to="`${$publicUrl}/?tab=weex`"
            @click.native="total=3"
            :class="$route.fullPath===$publicUrl+'/?tab=weex'?'active':''"
          >weex</router-link>
        </li>
        <li>
          <router-link
            :to="`${$publicUrl}/?tab=share`"
            @click.native="total=247"
            :class="$route.fullPath===$publicUrl+'/?tab=share'?'active':''"
          >分享</router-link>
        </li>
        <li>
          <router-link
            :to="`${$publicUrl}/?tab=ask`"
            @click.native="total=577"
            :class="$route.fullPath===$publicUrl+'/?tab=ask'?'active':''"
          >问答</router-link>
        </li>
        <li>
          <router-link
            :to="`${$publicUrl}/?tab=job`"
            @click.native="total=30"
            :class="$route.fullPath===$publicUrl+'/?tab=job'?'active':''"
          >招聘</router-link>
        </li>
      </ul>
      <div v-if="topics.length">
        <ul class="ping">
          <li v-for="topic in topics" :key="topic.id">
            <router-link :to="`${$publicUrl}/user/${topic.author.loginname}`">
              <img :style="{width:'30px',height:'30px'}" :src="topic.author.avatar_url" alt />
            </router-link>
            <div class="reply">
              <span>{{topic.reply_count}}</span>/
              <span>{{topic.visit_count}}</span>
            </div>
            <span
              v-if="$route.fullPath === $publicUrl+'/' || $route.fullPath===$publicUrl+'/?tab=all' || topic.top || topic.good"
              :class="{tab: true,active: topic.top || topic.good}"
            >{{topic.top?'置顶':topic.good?'精华':topic.tab==='share'?'分享':topic.tab==='ask'?'问答':topic.tab==='job'?'招聘':'weex'}}</span>
            <span class="title">
              <router-link :to="`${$publicUrl}/topic/${topic.id}`">{{topic.title}}</router-link>
            </span>
            <span>{{myMoment(topic.last_reply_at)}}</span>
          </li>
        </ul>
      </div>
      <img
        v-else
        src="https://hbimg.huabanimg.com/611bb3198c03cfefea188d170f33f27f1611c8e8a3ea-o8nm2q_fw658"
        alt
      />
      <el-pagination
        @current-change="currentChange"
        background
        layout="prev, pager, next"
        :page-size="20"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "home",

  data() {
    return {
      topics: [],
      total: 856
    };
  },
  watch: {
    "$route.fullPath": {
      immediate: true,
      handler() {
        const tab = this.$route.query.tab || "all";
        const page = this.$route.query.page || 1;
        this.topics = [];
        axios
          .get(`https://www.vue-js.com/api/v1/topics/?tab=${tab}&page=${page}`)
          .then(res => {
            this.topics = res.data.data;
            console.log(this.topics);
          });
      }
    }
  },
  methods: {
    myMoment(time) {
      moment.locale("zh-cn");
      return moment(time).fromNow();
    },
    currentChange(num) {
      console.log(num);
      const tab = this.$route.query.tab || 1;
      this.$router.push(`${this.$publicUrl}/?tab=${tab}&page=${num}`);
    }
  }

  // created() {
  //   axios
  //     .get(`https://www.vue-js.com/api/v1/topics?page=1&limit=20`)
  //     .then(res => {
  //       this.topics = res.data.data;
  //     });
  // }
};
</script>

<style>
.box2 {
  background-color: #e1e1e1;
}
a {
  text-decoration: none;
  color: black;
}
li {
  list-style: none;
}
.home {
  width: 80%;
  margin: 0 auto;
}
.home > img {
  width: 100%;
}
.home .nav {
  padding: 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
  background-color: #f6f6f6;
  margin: 0;
}
.home .nav li {
  margin-right: 25px;
}
.home .nav li a {
  color: #369219;
  padding: 3px 4px;
  border-radius: 3px;
}
.nav li a.active {
  background-color: #369219;
  color: white;
}
.ping {
  padding: 0;
  background-color: #fff;
}
.ping > li {
  /* line-height: 50px; */

  border-bottom: 1px solid rgba(236, 232, 232, 0.822);
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 15px 10px;
}
.ping > li > span.active {
  background-color: #369219;
  color: white;
}
.ping > li > .tab {
  padding: 2px 4px;
  margin-right: 15px;
  background-color: #e5e5e5;
  font-size: 12px;
  color: #999;
  height: 20px;
  flex-shrink: 0;
}
.ping > li > img {
  flex-shrink: 0;
}
.reply {
  margin-left: 10px;
  width: 70px;
  flex-shrink: 0;
}
.title {
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
