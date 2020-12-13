<template>
  <div>
    <div>Hello world</div>
    <div>Video place</div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      user_id: null,
      video_id: null,
      video: {}
    };
  },
  methods: {
    // update when > 40% watched
    // update when finished video
  },
  created() {
    // ** video **
    // get parameter from URL
    // lookup paratemer in mapping.csv for video id
    // found or not found
    // if found: GET request to get the video data
    // not found: error message
    // ** user id **
    // get query parameter user from url (user)
    // get user_id from local storage
    // define user id (not required)
    // what if no userid is defined?
  }
};
</script>
