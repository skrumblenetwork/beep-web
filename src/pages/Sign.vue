<template>
  <div id="app">Sign...</div>
</template>

<script>
import Skrumble from "../skrumble";
import { mapState, mapActions } from "vuex";

export default {
  computed: mapState({
    privateKey: state => state.user.privateKey
  }),
  methods: {
    ...mapActions("user", ["sign"])
  },
  sockets: {
    preLogin(data) {
      var signData = Skrumble.sign(data.code, this.privateKey);
      this.$socket.emit("login", signData);
    },
    logined() {
      this.sign().then(() => {
        this.$router.push({ path: "/chat" });
      });
    }
  },
  mounted: function() {
    this.$socket.emit("preLogin");
  }
};
</script>