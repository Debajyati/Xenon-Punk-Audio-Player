document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("search-bar");
  const playlist = document.getElementById("playlist");

  searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    let tracks = Array.from(playlist.getElementsByTagName("li"));
    tracks.forEach(track => {
      const text = track.textContent.toLowerCase();
      if (text.includes(query)) {
        track.style.display = "block";
      } else {
        track.style.display = "none";
      }
    });
  });
});

