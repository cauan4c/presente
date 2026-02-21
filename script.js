const audio = document.getElementById("audio");
const play = document.getElementById("play");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

// ▶ PLAY / PAUSE
play.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    play.textContent = "⏸";
  } else {
    audio.pause();
    play.textContent = "▶";
  }
});

// ⏱ Quando carregar a música
audio.addEventListener("loadedmetadata", () => {
  progress.max = Math.floor(audio.duration);
  durationEl.textContent = formatTime(audio.duration);
});

// 🔄 Atualizar barra enquanto toca
audio.addEventListener("timeupdate", () => {
  progress.value = Math.floor(audio.currentTime);
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

// 🎚 Arrastar barra para mudar tempo
progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
});

const volumeBtn = document.getElementById("volumeBtn");
const volumeSlider = document.getElementById("volumeSlider");

// Abrir / fechar mini slider
volumeBtn.addEventListener("click", () => {
  volumeBtn.parentElement.classList.toggle("active");
});

// Controle de volume
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;

  // Trocar ícone conforme volume
  if (audio.volume == 0) {
    volumeBtn.textContent = "🔇";
  } else if (audio.volume < 0.5) {
    volumeBtn.textContent = "🔉";
  } else {
    volumeBtn.textContent = "🔊";
  }
});

// ⏲ Função para formatar tempo
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}
