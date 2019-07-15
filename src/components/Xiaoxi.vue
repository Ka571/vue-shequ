<template>
  <div class="xiao">111111</div>
</template>

<script>
import axios from "axios";
export default {
  name: "xiao",
  data() {
    return {
      hasnot_read_messages: [],
      has_read_messages: []
    };
  },
  created() {
    axios
      .get(
        `https://www.vue-js.com/api/v1/messages?accesstoken=${sessionStorage.getItem(
          "token"
        )}`
      )
      .then(res => {
        console.log(res.data.data);
        this.has_read_messages = res.data.data.has_read_messages;
        // this.hasnot_read_messages = res.data.data.hasnot_read_messages;
      });
  }
};
</script>

<style>
.xiao {
  width: 80%;
  margin: 0 auto;
}
</style>
