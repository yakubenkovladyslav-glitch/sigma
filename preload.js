// preload.js
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // pour étendre plus tard si besoin
})
