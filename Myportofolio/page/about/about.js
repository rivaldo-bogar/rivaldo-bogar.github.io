const myAudio = document.getElementById("myAudio");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");

playBtn.addEventListener("click", () => {
    myAudio.play();
});

pauseBtn.addEventListener("click", () => {
    myAudio.pause();
});

stopBtn.addEventListener("click", () => {
    myAudio.pause();
    myAudio.currentTime = 0;
});



    // Testing

 
    