document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio");
  const playButton = document.getElementById("play");
  const pauseButton = document.getElementById("pause");
  const stopButton = document.getElementById("stop");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const loopButton = document.getElementById("loop");
  const shuffleButton = document.getElementById("shuffle");
  const singleLoopButton = document.getElementById("single-loop");
  const playlist = document.getElementById("playlist");
  const title = document.getElementById("title");
  const animation = document.getElementById("animation");
  const nowPlaying = document.getElementById("now-playing");
  const uploadInput = document.getElementById("upload-input");
  const uploadButton = document.getElementById("upload-button");
  const forMobile = window.matchMedia("(max-width: 768px)");
  let isLooping = false;
  let isShuffling = false;
  let isSingleLoop = false;
  let currentTrack = 0;

  let tracks = Array.from(playlist.getElementsByTagName("li"));

  function updateButtonStates() {
    loopButton.style.background = isLooping ? "#6f2232" : "#5CC4FF";
    shuffleButton.style.background = isShuffling ? "#6f2232" : "#5CC4FF";
    singleLoopButton.style.background = isSingleLoop ? "#6f2232" : "#5CC4FF";
  }

  function resetModes() {
    isLooping = false;
    isShuffling = false;
    isSingleLoop = false;
  }

  function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.getAttribute("data-src");
    audio.load();
    audio.play();
    nowPlaying.textContent = `Now playing: ${track.textContent}`;
  }

  function addTrackToPlaylist(name, src) {
    const li = document.createElement("li");
    li.textContent = `🎧 ${name}`;
    li.setAttribute("data-src", src);
    playlist.appendChild(li);
    tracks = Array.from(playlist.getElementsByTagName("li"));
  }

  function playNext() {
    if (isShuffling) {
      currentTrack = Math.floor(Math.random() * tracks.length);
    } else if (isSingleLoop) {
      // Do nothing, continue playing the same track
    } else {
      currentTrack = (currentTrack + 1) % tracks.length;
      if (currentTrack === 0 && !isLooping) {
        audio.pause();
        return;
      }
    }
    loadTrack(currentTrack);
  }

  function playPrev() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
  }

  audio.addEventListener("ended", () => {
    playButton.textContent = "Play";
    animation.style.display = "none";
    nowPlaying.textContent = "";
    mobileMediaiQueryListener(forMobile, "ended");
    if (isLooping || isSingleLoop || isShuffling) {
      playNext();
    }
  });

  audio.addEventListener("play", () => {
    playButton.textContent = "Play";
    animation.style.display = "flex";
    mobileMediaiQueryListener(forMobile, "play");
    nowPlaying.textContent = `Now playing: ${tracks[currentTrack].textContent}`;
  });

  audio.addEventListener("pause", () => {
    playButton.textContent = "Resume";
    animation.style.display = "none";
    mobileMediaiQueryListener(forMobile, "pause");
  });

  playButton.addEventListener("click", () => {
    audio.play();
  });

  pauseButton.addEventListener("click", () => {
    audio.pause();
  });

  stopButton.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    nowPlaying.textContent = "";
  });

  prevButton.addEventListener("click", () => {
    playPrev();
  });

  nextButton.addEventListener("click", () => {
    playNext();
  });
  // Loop button
  loopButton.addEventListener("click", () => {
    if (!isLooping) {
      resetModes();
      isLooping = true;
      playNext();
    } else {
      isLooping = false;
    }
    updateButtonStates();
  });

  loopButton.addEventListener("mouseover", () => {
    loopButton.style.background = "linear-gradient(45deg, rgba(58, 73, 112, 1) 0%, rgba(92, 196, 255, 0.9640231092436975) 98%)";
  });

  loopButton.addEventListener("mouseout", () => {
    loopButton.style.background = isLooping ? "#6f2232" : "#5CC4FF";
  });

  // Shuffle button
  shuffleButton.addEventListener("click", () => {
    if (!isShuffling) {
      resetModes();
      isShuffling = true;
    } else {
      isShuffling = false;
    }
    updateButtonStates();
  });

  shuffleButton.addEventListener("mouseover", () => {
    shuffleButton.style.background = "linear-gradient(45deg, rgba(58, 73, 112, 1) 0%, rgba(92, 196, 255, 0.9640231092436975) 98%)";
  });

  shuffleButton.addEventListener("mouseout", () => {
    shuffleButton.style.background = isShuffling ? "#6f2232" : "#5CC4FF";
  });

  // Single loop button
  singleLoopButton.addEventListener("click", () => {
    if (!isSingleLoop) {
      resetModes();
      isSingleLoop = true;
    } else {
      isSingleLoop = false;
    }
    updateButtonStates();
  });

  singleLoopButton.addEventListener("mouseover", () => {
    singleLoopButton.style.background = "linear-gradient(45deg, rgba(58, 73, 112, 1) 0%, rgba(92, 196, 255, 0.9640231092436975) 98%)";
  });

  singleLoopButton.addEventListener("mouseout", () => {
    singleLoopButton.style.background = isSingleLoop ? "#6f2232" : "#5CC4FF";
  });

  playlist.addEventListener("click", (e) => {
    if (e.target && e.target.nodeName === "LI") {
      currentTrack = tracks.indexOf(e.target);
      loadTrack(currentTrack);
    }
  });
  
  uploadButton.addEventListener("click", () => {
    const files = uploadInput.files;
    for (const file of files) {
      const fileExists = tracks.some((track) => track.textContent === `🎧 ${file.name}`);
      if (fileExists) {
        swal({ title: "File " + file.name + " already exists in the playlist", text: "Duplicate File Found! Upload Aborted...", icon: "error", dangerMode: true, buttons: true });
      } else {
        const url = URL.createObjectURL(file);
        addTrackToPlaylist(file.name, url);
      }
    }
  });

  title.animate([
    { opacity: 1, color: "#5CC4FF" },
    { opacity: 0.3, color: "#5CC4FF" },
    { opacity: 0.7, color: "#9D0062" },
    { opacity: 0.3, color: "#6f2232" },
    { opacity: 1, color: "#6f2232" },
    { opacity: 0.8, color: "#3C00C3" },
    { opacity: 0.8, color: "#397cfb" },
    { opacity: 0.3, color: "#5CC4FF" },
    { opacity: 1, color: "#5CC4FF" },
  ], { duration: 2000, iterations: Infinity });
});

function mobileMediaiQueryListener(query, event) {
  const containerEl = document.querySelector(".container");
  const audioInfoEl = document.getElementById("now-playing");
  const playlistEl = document.getElementById("playlist");
  if (query.matches && event === "play") {
    containerEl.classList.add("margin-top-20");
    audioInfoEl.classList.add("margin-bottom-20");
  } else {
    containerEl.classList.remove("margin-top-20");
    audioInfoEl.classList.remove("margin-bottom-20");
    playlistEl.classList.add("playlist");
  }
}
