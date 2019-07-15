<template>
  <div>
    <select v-model="tab">
      <option value>请选择</option>
      <option value="weex">WEEX</option>
      <option value="share">分享</option>
      <option value="good">问答</option>
      <option value="job">招聘</option>
    </select>
    <input type="text" v-model="title" />
    <!-- <textarea v-model="content" cols="30" rows="10"></textarea> -->
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    ></quill-editor>
    <button @click="submit">提交</button>
  </div>
</template>

<script>
import axios from "axios";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  name: "tt",
  data() {
    return {
      tab: "",
      title: "",
      content: "",
      editorOption: {}
    };
  },
  components: {
    quillEditor
  },
  methods: {
    submit() {
      axios
        .post("https://www.vue-js.com/api/v1/topics", {
          tab: this.tab,
          content: this.content,
          title: this.title,
          accesstoken: sessionStorage.getItem("token")
        })
        .then(res => {
          console.log(res.data);
          this.tab = "";
          this.title = "";
          this.content = "";
          this.$router.push(`/topic/${res.data.topic_id}`);
        });
    },
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    }
  }
};
</script>

<style>
</style>
