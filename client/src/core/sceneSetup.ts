import * as BABYLON from 'babylonjs'
import { handleMovement } from '../player/playerMovement'
import { setupEngine } from './engineSetup'

export function initBabylonScene (room: any): void {
  const { engine, scene } = setupEngine('renderCanvas')

  // Crear la cámara
  const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 10, -10), scene)
  camera.setTarget(BABYLON.Vector3.Zero())
  camera.attachControl(engine.getRenderingCanvas(), true)

  // Crear la luz
  const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene)
  light.intensity = 0.75

  // Manejo del movimiento del jugador
  handleMovement(room)

  // Render loop
  engine.runRenderLoop(() => {
    scene.render()
  })
}
