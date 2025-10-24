console.log("Welcome to Spotify");

let songindex = 0;
let audioElement = new Audio("1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let mastersongname = document.getElementById("mastersongname");

let songItems = Array.from(document.getElementsByClassName("songItems"));
let timestamps = document.querySelectorAll(".timestamp");

let songs = [
  { songName: "salam-e-Ishq", filepath: "1.mp3", coverpath: "1.jpg" },
  { songName: "Babe", filepath: "2.mp3", coverpath: "2.jpg" },
  { songName: "a", filepath: "3.mp3", coverpath: "3.jpg" },
  { songName: "cc", filepath: "4.mp3", coverpath: "4.jpg" },
  { songName: "seek", filepath: "5.mp3", coverpath: "5.jpg" },
];

// Set images + durations
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverpath;

  let tmp = new Audio(songs[i].filepath);
  tmp.addEventListener("loadedmetadata", () => {
    let m = Math.floor(tmp.duration / 60);
    let s = Math.floor(tmp.duration % 60);
    s = s < 10 ? "0" + s : s;
    timestamps[i].innerText = `${m}:${s}`;
  });
});

const makeAllPlay = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((el) => {
    el.classList.remove("fa-pause-circle");
    el.classList.add("fa-play-circle");
  });
};

// ✅ Song click logic — correct placement
Array.from(document.getElementsByClassName("songItemPlay")).forEach((el) => {
  el.addEventListener("click", (e) => {
    let idx = parseInt(e.target.id);

    if (songindex === idx && !audioElement.paused) {
      audioElement.pause();
      makeAllPlay();
      masterPlay.classList.add("fa-play-circle");
      masterPlay.classList.remove("fa-pause-circle");
      gif.style.opacity = 0;
    } else {
      makeAllPlay();
      songindex = idx;
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");

      audioElement.src = songs[idx].filepath;
      mastersongname.innerText = songs[idx].songName;
      audioElement.currentTime = 0;
      audioElement.play();

      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    }
  });
});

// Master Play button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused) {
    audioElement.play();
    masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.replace("fa-pause-circle", "fa-play-circle");
    gif.style.opacity = 0;
    makeAllPlay();
  }
});

// Progress bar updating
audioElement.addEventListener("timeupdate", () => {
  myProgressBar.value = parseInt((audioElement.currentTime / audioElement.duration) * 100);
});

// Seek feature
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Next button
next.addEventListener("click", () => {
  songindex = (songindex + 1) % songs.length;
  audioElement.src = songs[songindex].filepath;
  mastersongname.innerText = songs[songindex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  makeAllPlay();
  document.getElementById(songindex).classList.replace("fa-play-circle", "fa-pause-circle");
});

// Prev button
previous.addEventListener("click", () => {
  songindex = songindex <= 0 ? 0 : songindex - 1;
  audioElement.src = songs[songindex].filepath;
  mastersongname.innerText = songs[songindex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  makeAllPlay();
  document.getElementById(songindex).classList.replace("fa-play-circle", "fa-pause-circle");
});
