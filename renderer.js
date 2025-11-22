// renderer.js
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')
  const clickSound = document.getElementById('clickSound')

  // taille du PNG ; on peut l'ajuster
  const SIZE = 220

  window.addEventListener('pointerdown', (ev) => {
    // position du clic
    const x = ev.clientX
    const y = ev.clientY
    spawnSigmaAt(x, y)
  })

  function spawnSigmaAt(x, y) {
    // overlay container
    const overlay = document.createElement('div')
    overlay.className = 'sigma-overlay'
    overlay.style.left = (x - SIZE/2) + 'px'
    overlay.style.top = (y - SIZE/2) + 'px'
    overlay.style.width = SIZE + 'px'
    overlay.style.height = SIZE + 'px'

    // flash
    const flash = document.createElement('div')
    flash.className = 'flash'
    overlay.appendChild(flash)

    // image
    const img = document.createElement('img')
    img.src = 'assets/sigma.png' // place ton PNG ici
    img.draggable = false
    overlay.appendChild(img)

    document.body.appendChild(overlay)

    // play sound if exists and allowed
    try {
      if (clickSound && clickSound.play) {
        clickSound.currentTime = 0
        clickSound.play().catch(()=>{/* autoplay blocked until user interacts; but we are in pointer event so usually fine */})
      }
    } catch(e) {}

    // animate
    requestAnimationFrame(() => {
      img.classList.add('play-pop')
      img.classList.add('play-shake')
      flash.classList.add('play-flash')
    })

    // cleanup after animation
    setTimeout(() => {
      overlay.style.transition = 'opacity .25s'
      overlay.style.opacity = '0'
      setTimeout(()=> overlay.remove(), 300)
    }, 800)
  }
})
