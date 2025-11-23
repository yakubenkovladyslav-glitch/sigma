let gameStarted = false;
let clickCount = Number(localStorage.getItem("sigmaClicks") || 0);

const counter = document.getElementById("counter");

// mettre à jour affichage
counter.textContent = "Clicks: " + clickCount;

// bouton start
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");

// Démarrage du jeu
startBtn.addEventListener("click", () => {
  gameStarted = true;
  startScreen.style.display = "none";   // cacher l'écran
});

// images sigma
const imgs = [
  "img/sigma1.png",
  "img/sigma2.png",
  "img/sigma3.png"
];

// sons
const sounds = [
  new Audio("sounds/s1.mp3"),
  new Audio("sounds/s2.mp3"),
  new Audio("sounds/s3.mp3")
];

// CLICK PARTOUT
document.addEventListener("click", (e) => {
  if (!gameStarted) return; // empêche de jouer avant SIGMA

  clickCount++;
  localStorage.setItem("sigmaClicks", clickCount);
  counter.textContent = "Clicks: " + clickCount;

  spawnSigma(e.clientX, e.clientY);
});

// afficher compteur (L)
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "l") {
    counter.classList.toggle("hidden");
  }
});

// spawn de l'animation sigma
function spawnSigma(x, y) {
  const overlay = document.createElement("div");
  overlay.className = "sigma-overlay play-pop";

  overlay.style.left = (x - 110) + "px";
  overlay.style.top = (y - 110) + "px";

  const img = document.createElement("img");
  img.src = imgs[Math.floor(Math.random() * imgs.length)];
  overlay.appendChild(img);

  // flash
  const flash = document.createElement("div");
  flash.className = "flash play-flash";
  overlay.appendChild(flash);

  document.body.appendChild(overlay);

  // son
  const s = sounds[Math.floor(Math.random() * sounds.length)];
  s.currentTime = 0;
  s.play();

  // enlever après animation
  setTimeout(() => overlay.remove(), 500);
}
