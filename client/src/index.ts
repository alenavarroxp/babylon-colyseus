import { initBabylonScene } from './core/sceneSetup'
import { connectToServer } from './network/clientConnection'

document.addEventListener('DOMContentLoaded', () => {
  void init()
})

async function init (): Promise<void> {
  const room = await connectToServer()

  if (room !== undefined) {
    initBabylonScene(room)
  }
}
