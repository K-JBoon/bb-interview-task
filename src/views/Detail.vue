<template>
  <div>
    <div id="player">Video</div>
  </div>
</template>

<script>
const axios = require("axios");
const api = "https://jsonplaceholder.typicode.com/posts";

export default {
  name: "Detail",
  data() {
    return {
      mapping: {},
      placehold_id: null,
      user_id: null,
      video_id: null,
      videoPlayer: null,
      duration: null,
      progress: 0
    };
  },
  methods: {
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
    },
    checkProgress() {
      const timeSpent = this.videoPlayer.getCurrentTime(); // returns Float

      // check if user started
      if (timeSpent === 0) {
        return;
      }

      // no logged in user so we cannot set progress
      // @todo: do we need to show an error message?
      if (!this.user_id) {
        return;
      }

      // @todo: oldProgress default is currently considered 0 since we do not load user data
      const oldProgress = this.progress;
      // duration is integer, time is float. clean so max progress = 100
      const newProgress = Math.min((timeSpent / this.duration) * 100, 100);

      if (newProgress >= 100 && oldProgress < 100) {
        // update finished video
        axios
          .post(api, {
            user_id: this.user_id,
            id: this.placehold_id,
            progress: newProgress,
            finished: true
          })
          .then((result) => {
            console.log(result.data);
          });
      } else if (newProgress >= 40 && oldProgress < 40) {
        // update when > 40% watched but not finished yet
        axios
          .post(api, {
            user_id: this.user_id,
            id: this.placehold_id,
            progress: newProgress,
            finished: false
          })
          .then((result) => {
            console.log(result.data);
          });
      }

      // update state
      this.progress = newProgress;
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
      this.videoPlayer = new window.bluebillywig.Player(
        `http://demo.bbvms.com/p/default/c/${this.video_id}.json`,
        {
          target: document.getElementById("player"),
          autoPlay: "false"
        }
      );
      this.videoPlayer.on("ready", () => {
        // set duration. Note: videoPlayer returns a whole value as a string
        const duration = parseInt(this.videoPlayer.getDuration(), 10);
        if (duration >= 0) {
          this.duration = duration;
        }
      });
      // keep track of progress
      this.videoPlayer.on("statechange", () => {
        this.checkProgress();
      });
    });
    document.head.appendChild(playerScript);
  }
};
</script>
