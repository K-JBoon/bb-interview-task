<template>
  <main>
    <div>
      <h2>
        {{ this.video.clipData.title ? this.video.clipData.title : "Video" }}
      </h2>
      <div v-if="this.video.notFound">
        <p>
          Video niet gevonden. Probeer één van onderstaande id's
        </p>
        <div class="container-items">
          <div v-for="item in placeholdValues" :key="item" class="item" @click="setPlaceholdID(item)">
            {{ item }}
          </div>
        </div>
      </div>
      <!-- no error, are we loading? -->
      <div v-else-if="!this.video.ready">
        Video is aan het laden...
      </div>
      <div id="player"></div>
    </div>
  </main>
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
        id: null,
        player: null,
        clipData: {},
        duration: null,
        progress: 0,
        ready: false,
        notFound: false
      }
    };
  },
  computed: {
    // Return placeholder ids in mapping, sorted asc
    placeholdValues() {
      return this.mapping
        .map((item) => {
          return item[0];
        })
        .sort((a, b) => {
          return a - b;
        });
    }
  },
  methods: {
    async init() {
      // get user from router / local storage
      this.initUserID();

      // get requested video parameter from URL
      const placehold_id = parseInt(this.$route.params.id, 10);
      this.placehold_id = placehold_id;

      // get mapping file
      // @todo: check if this can be done better
      await axios.get("mapping.csv").then((result) => {
        const json = Papa.parse(result.data, {
          header: false,
          skipEmptyLines: "greedy"
        });
        this.mapping = json.data;
      });

      const video_id = this.mapPlaceholdToVideo(placehold_id);

      if (!video_id) {
        this.video.notFound = true;
        return;
      }
      this.video.id = video_id;

      // mounted DOM? init player
      this.$nextTick(() => {
        this.initPlayer();
      });
    },
    initUserID() {
      // get query parameter user from url (user) or local storage (user_id)
      const user_id_query = this.$route.query.user;
      const user_id_local = localStorage.getItem("user_id");
      // id defined in url overrules local storage (@todo: check if this meets business requirement)
      const user_id = user_id_query ? user_id_query : user_id_local;
      this.user_id = parseInt(user_id, 10); // not required! what if no userid is set?

      // set in localstorage. @todo check if this is required
      if (user_id) {
        localStorage.setItem("user_id", user_id);
      }
    },
    mapPlaceholdToVideo(placeholdID) {
      // stored in this.mapping as [placeholdId, videoID]
      const result = this.mapping.find((item) => {
        return parseInt(item[0], 10) === placeholdID;
      });

      if (!result) {
        return null;
      }
      // return videoID
      return result[1];
    },
    checkProgress() {
      // @todo: one video can have many clips
      // do we want to save the progress per clip? or per video?

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
      // clean to int && clean max progress = 100. Progress can be > 100 because duration is int and time is float
      newProgress = Math.min(Math.ceil(newProgress), 100);

      if (newProgress >= 100 && oldProgress < 100) {
        // update finished video
        axios
          .post(api, {
            user_id: this.user_id,
            placehold_id: this.placehold_id,
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
            placehold_id: this.placehold_id,
            progress: newProgress,
            finished: false
          })
          .then((result) => {
            console.log(result.data);
          });
      }

      // update state
      this.video.progress = newProgress;
    },
    initPlayer() {
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
          this.video.ready = true;
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
    setPlaceholdID(placeholdID) {
      this.$router.push(`/${placeholdID}`);
    }
  },
  created() {
    this.init();
  },
  destroyed() {
    // if you close this component: check progress if a video was set
    if (this.video.ready === true) {
      this.checkProgress();
    }
  },
  watch: {
    "$route.params.id"() {
      // changing ID in url? init again.
      if (this.video.player) {
        this.video.player.destruct();
      }

      // @todo: refactor for less duplicate code
      this.placehold_id = null;
      this.video.clipData = {};
      this.video.id = null;
      this.video.duration = null;
      this.video.progress = 0;
      this.video.ready = false;
      this.video.notFound = false;

      this.init();
    }
  }
};
</script>

<style scoped>
main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 12px;
}

.container-items {
  display: flex;
  flex-wrap: wrap;
}
.item {
  padding: 12px;
  margin: 2px;
  border: 1px solid black;
  border-radius: 12px;
  cursor: pointer;
}
</style>
