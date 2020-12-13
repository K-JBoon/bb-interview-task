<template>
  <div>
    <h2>
      {{ this.video.clipData.title ? this.video.clipData.title : "Video" }}
    </h2>
    <div id="player"></div>
  </div>
</template>

<script>
const axios = require("axios");
const api = "https://jsonplaceholder.typicode.com/posts";
const Papa = require("papaparse");

export default {
  name: "Detail",
  data() {
    return {
      mapping: {},
      placehold_id: null,
      user_id: null,
      video: {
        player: null,
        clipData: {},
        id: null,
        duration: null,
        progress: 0
      }
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
    mapPlaceholdToVideo(placeholdID) {
      // stored in this.mapping as [placeholdId, videoID]
      const result = this.mapping.find((item) => {
        console.log(parseInt(item[0], 10));
        console.log(placeholdID);
        return parseInt(item[0], 10) === placeholdID;
      });

      if (!result) {
        return null;
      }
      // return videoID
      return result[1];
    },
    checkProgress() {
      const timeSpent = this.video.player.getCurrentTime(); // returns Float

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
      const oldProgress = this.video.progress;
      const duration = this.video.duration;

      let newProgress = (timeSpent / duration) * 100;
      // clean to int
      // clean max progress = 100. Progress can be > 100 because duration is int and time is float
      newProgress = Math.min(Math.ceil(newProgress), 100);

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
      this.video.progress = newProgress;
    }
  },
  async created() {
    // ** video **
    // get parameter from URL
    const placehold_id = parseInt(this.$route.params.id, 10);
    this.placehold_id = placehold_id;

    // get mapping file
    // @todo: check if this can be done better
    await axios.get("mapping.csv").then((result) => {
      const json = Papa.parse(result.data, {
        header: false
      });
      console.log(json.data);
      this.mapping = json.data;
    });

    const video_id = this.mapPlaceholdToVideo(placehold_id);
    console.log(video_id);
    // const video_id = 3888497;
    if (!video_id) {
      // not found: error message
      return;
    }
    this.video.id = video_id;

    // user id
    this.initUserID();
  },
  mounted() {
    // initialize player
    let playerScript = document.createElement("script");
    playerScript.setAttribute("src", "http://demo.bbvms.com/launchpad/");
    playerScript.addEventListener("load", () => {
      // when loaded: set the video
      this.video.player = new window.bluebillywig.Player(
        `http://demo.bbvms.com/p/default/c/${this.video.id}.json`,
        {
          target: document.getElementById("player"),
          autoPlay: "false"
        }
      );
      this.video.player.on("ready", () => {
        // set duration. Note: videoPlayer returns a whole value as a string
        const duration = parseInt(this.video.player.getDuration(), 10);
        if (duration >= 0) {
          this.video.duration = duration;
        }
        this.video.clipData = this.video.player.getClipData();
      });
      // keep track of progress
      this.video.player.on("statechange", () => {
        this.checkProgress();
      });
    });
    document.head.appendChild(playerScript);
  },
  destroyed() {
    // if you close this component: check progress
    this.checkProgress();
  }
};
</script>
