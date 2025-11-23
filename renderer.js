// renderer.js
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const counterBox = document.getElementById('counter');

  // ← charge le compteur (0 si rien dans localStorage)
  let clickCount = parseInt(localStorage.getItem("sigmaClicks") || "0");
  updateCounter();

  // LISTE DES IMAGES
  const images = [
    "assets/sigma1.png",
    "assets/sigma2.png",
    "assets/sigma3.png",
    "assets/sigma4.png"
  ];

  // LISTE DES SONS
  const sounds = [
    "assets/sound1.wav",
    "assets/sound2.wav",
    "assets/sound3.wav"
  ];

  const SIZE = 220;

  // CLIC
  window.addEventListener('pointerdown', (ev) => {
    const x = ev.clientX;
    const y = ev.clientY;
    spawnSigmaAt(x, y);

    clickCount++;
    localStorage.setItem("sigmaClicks", clickCount);
    updateCounter();
  });

  // AFFICHER compteur quand L est pressé
  window.addEventListener('keydown', (ev) => {
    if (ev.key.toLowerCase() === "l") {
      counterBox.classList.toggle("hidden");
    }
  });

  function updateCounter() {
    counterBox.innerText = "Clicks: " + clickCount;
  }

  function spawnSigmaAt(x, y) {
    const overlay = document.createElement('div');
    overlay.className = 'sigma-overlay';
    overlay.style.left = (x - SIZE/2) + 'px';
    overlay.style.top = (y - SIZE/2) + 'px';

    // FLASH
    const flash = document.createElement('div');
    flash.className = 'flash';
    overlay.appendChild(flash);

    // IMAGE aleatoire
    const img = document.createElement('img');
    img.src = randomItem(images);
    overlay.appendChild(img);

    document.body.appendChild(overlay);

    // SON aleatoire
    const audio = new Audio(randomItem(sounds));
    audio.volume = 0.9;
    audio.play().catch(()=>{});

    // ANIM
    requestAnimationFrame(() => {
      img.classList.add('play-pop');
      img.classList.add('play-shake');
      flash.classList.add('play-flash');
    });

    // SUPPRESSION
    setTimeout(() => {
      overlay.style.transition = 'opacity .25s';
      overlay.style.opacity = '0';
      setTimeout(()=> overlay.remove(), 300);
    }, 800);
  }

  function randomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
  }
});
