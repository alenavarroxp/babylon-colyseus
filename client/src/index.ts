import { initBabylonScene } from './core/sceneSetup'
import { connectToServer } from './network/clientConnection'

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa la escena de BabylonJS
  const { room } = connectToServer()

  initBabylonScene(room)
})
