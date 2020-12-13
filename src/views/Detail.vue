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
  },
  created() {
    // ** video **
    // get parameter from URL
    const placehold_id = this.$route.params.id;
    this.placehold_id = placehold_id;
    // lookup paratemer in mapping.csv for video id
    const video_id = 3888497;
    this.video_id = video_id;
    // found or not found
    // if found: GET request to get the video data
    axios.get("");
    // not found: error message
    // ** user id **
    // get query parameter user from url (user)
    // get user_id from local storage
    // define user id (not required)
    // what if no userid is defined?
  },
  mounted() {
    let playerScript = document.createElement("script");
    playerScript.setAttribute("src", "http://demo.bbvms.com/launchpad/");
    document.head.appendChild(playerScript);

    // make this pretty async later
    setTimeout(() => {
      var myPlayer = new window.bluebillywig.Player(
        `http://demo.bbvms.com/p/default/c/${this.video_id}.json`,
        {
          target: document.getElementById("player"),
          autoPlay: "false"
        }
      );
      // call the play method on the newly created player:
      myPlayer.play();
    }, 500);
  }
};
</script>
