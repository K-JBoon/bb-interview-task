
// window.onload = function() {

function playBB(){

var mediaID = document.getElementById('mydiv').dataset.test;
var videoURL = `https://demo.bbvms.com/p/default/c/${mediaID}.json`;
// Embed the player in the element "myPlayerDiv". Other playout settings (like width, height, autoPlay) can also be overruled by including them in the object passed as a second parameter:
var myPlayer = new bluebillywig.Player( videoURL, {
        target : document.getElementById("myPlayerDiv"),
        autoPlay : "false",
        width: "90%",
        height: "90%"
});
// call the play method on the newly created player:
myPlayer.play();
}
// }

export const playBB = playBB;