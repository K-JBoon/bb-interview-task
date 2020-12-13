<template>
  <div>
    <div>Hello world</div>
    <div id="player">Video place</div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "Detail",
  data() {
    return {
      user_id: null,
      placehold_id: null,
      video_id: null,
      video: {},
      mapping: {}
    };
  },
  methods: {
    // update when > 40% watched
    // update when finished video
    initUserID() {
      // get query parameter user from url (user) or local storage (user_id)
      const user_id_query = this.$route.query.user;
      const user_id_local = localStorage.getItem("user_id");
      // id defined in url overrules local storage
      const user_id = user_id_query ? user_id_query : user_id_local;
      this.user_id = parseInt(user_id); // not required! what if no userid is set?

      // do we set the new user_id in localstarge now? (check requirements)
      if (user_id) {
        localStorage.setItem("user_id", user_id);
      }
    }
  },
  created() {
    // ** video **
    // get parameter from URL
    const placehold_id = this.$route.params.id;
    this.placehold_id = parseInt(placehold_id, 10);
    // lookup paratemer in mapping.csv for video id
    const video_id = 3888497;
    this.video_id = video_id;
    // found or not found
    // if found: GET request to get the video data
    axios.get("");
    // not found: error message
    // ** user id **
    this.initUserID();
  },
  mounted() {
    // initialize player
    let playerScript = document.createElement("script");
    playerScript.setAttribute("src", "http://demo.bbvms.com/launchpad/");
    playerScript.addEventListener("load", () => {
      // when loaded: set the video
      new window.bluebillywig.Player(`http://demo.bbvms.com/p/default/c/${this.video_id}.json`, {
        target: document.getElementById("player"),
        autoPlay: "false"
      });
    });
    document.head.appendChild(playerScript);
  }
};
</script>
