<template>
  <div v-if="topic" class="topic">
    <div class="article-head">
      <span class="tab" v-if="topic.top||topic.good">{{topic.top?"置顶":"精华"}}</span>
      <h2>{{topic.title}}</h2>
      <span v-if="isLogin" @click="changeCollect" class="collect">{{is_collect ? '取消收藏' : '加入收藏'}}</span>
    </div>
    <p class="ta">
      <b>·</b>
      <span>发布于{{myMoment(topic.last_reply_at)}}</span>
      <b>·</b>
      <span>作者{{topic.author.loginname}}</span>
      <b>·</b>
      <span>{{topic.visit_count}} 次浏览</span>
      <b>·</b>
      <span>来自 {{topic.tab === 'share' ? '分享' : topic.tab ==='ask' ? '问答' : topic.tab ==='job' ? '招聘' : 'weex'}}</span>
    </p>
    <div class="content" v-html="topic.content"></div>
    <div class="comment">
      <p>{{topic.replies.length}}回复</p>
      <ul>
        <li v-for=" comment in topic.replies" :key="comment.id">
          <span v-html="comment.content"></span>
          <span>
            <span @click="up(comment.id)">{{ isUped(comment.id) ?'👍' : '赞'}}</span>
            {{comment.ups.length ? comment.ups.length : ''}}
          </span>
          <span @click="addReply(comment.author.loginname)">回复</span>
          zan
        </li>
      </ul>
    </div>
    <div>
      <textarea class="replly" v-model="text" cols="30" rows="10"></textarea>
      <button @click="addComment">回复</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "topic",
  data() {
    return {
      topic: null,
      is_collect: false,
      text: ""
    };
  },
  computed: {
    isLogin() {
      return Boolean(sessionStorage.getItem("token"));
    }
  },
  created() {
    const { id } = this.$route.params;
    axios.get(`https://www.vue-js.com/api/v1/topic/${id}`).then(res => {
      console.log(res.data.data);
      this.topic = res.data.data;
    });
  },
  methods: {
    myMoment(time) {
      moment.locale("zh-cn");
      return moment(time).fromNow();
    },
    changeCollect() {
      const obj = {
        topic_id: this.$route.params.id,
        accesstoken: sessionStorage.getItem("token")
      };
      if (this.is_collect) {
        axios
          .post(`https://www.vue-js.com/api/v1/topic/de_collect`, obj)
          .then(res => {
            if (res.data.success) {
              this.is_collect = false;
            }
          });
      } else {
        axios
          .post(`https://www.vue-js.com/api/v1/topic/collect`, obj)
          .then(res => {
            if (res.data.success) {
              this.is_collect = true;
            }
          });
      }
    },
    addComment() {
      axios
        .post(`https://www.vue-js.com/api/v1/topic/${this.topic.id}/replies`, {
          accesstoken: sessionStorage.getItem("token"),
          content: this.text
        })
        .then(res => {
          axios
            .get(`https://www.vue-js.com/api/v1/topic/${this.topic.id}`)
            .then(res => {
              this.topic = res.data.data;
            });
        });
    },
    up(id) {
      if (sessionStorage.getItem("token")) {
        axios
          .post(`https://www.vue-js.com/api/v1/reply/${id}/ups`, {
            accesstoken: sessionStorage.getItem("token")
          })
          .then(res => {
            console.log(res.data.action);
            if (res.data.action === "up") {
              this.topic.replies
                .find(item => item.id === id)
                .ups.push(sessionStorage.getItem("user_id"));
            } else {
              this.topic.replies.find(
                item => item.id === id
              ).ups = this.topic.replies
                .find(item => item.id === id)
                .ups.filter(item => item != sessionStorage.getItem("user_id"));
            }
          });
      } else {
        alert("请登录");
      }
    },
    isUped(id) {
      return (
        this.topic.replies
          .find(item => item.id === id)
          .ups.indexOf(sessionStorage.getItem("user_id")) !== -1
      );
    },
    addReply(loginname) {
      this.text = `@${loginname}`;
      document.querySelector(".reply").focus();
    }
  }
};
</script>

<style>
.replly {
  width: 60%;
}
.article-head {
  display: flex;
  align-items: center;
}
.article-head > span:first-child {
  height: 20px;
}
.article-head > h2 {
  flex-grow: 1;
}
.ta {
  font-size: 14px;
}
.tab {
  background-color: #369219;
  color: white;
  font-size: 12px;
  padding: 2px 4px;
}
.topic {
  width: 90%;
  margin: 0 auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #fff;
}
.topic .article-head {
  padding: 10px;
}
.topic .article-head h2 {
  margin: 8px 0;
}
.topic .content {
  padding: 10px;
  border-top: 1px solid #e5e5e5;
}
.topic .content .markdown-text > :first-child,
.preview > :first-child {
  margin-top: 0;
}
.preview h1,
.preview h2,
.preview h3,
.preview h4,
.preview h5,
.preview h6,
.reply_area h1,
.reply_area h2,
.reply_area h3,
.reply_area h4,
.reply_area h5,
.reply_area h6,
.topic_content h1,
.topic_content h2,
.topic_content h3,
.topic_content h4,
.topic_content h5,
.topic_content h6 {
  margin: 30px 0 15px;
  border-bottom: 1px solid #eee;
}
.preview p,
.reply_content p,
.reply_form p,
.topic_content p {
  font-size: 15px;
  line-height: 1.7em;
  overflow: auto;
}
.markdown-text p,
.preview p {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  line-height: 2em;
  margin: 1em 0;
}
.content img {
  height: auto;
  max-width: 100%;
  vertical-align: middle;
  border: 0;
  -ms-interpolation-mode: bicubic;
}
</style>

<style>
.topic {
  width: 80%;
  margin: 0 auto;
}
/* content .topic_full_title {
    font-size: 22px;
    font-weight: 700;
    margin: 8px 0;
    display: inline-block;
    vertical-align: bottom;
    width: 75%;
    line-height: 130%; */
</style>
