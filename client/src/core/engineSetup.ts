import * as BABYLON from 'babylonjs'

export function setupEngine (canvasId: string): { engine: BABYLON.Engine, scene: BABYLON.Scene } {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement
  const engine = new BABYLON.Engine(canvas, true)
  const scene = new BABYLON.Scene(engine)

  // Ajustar el tamaño del canvas cuando la ventana cambia de tamaño
  window.addEventListener('resize', () => {
    engine.resize()
  })

  return { engine, scene }
}
