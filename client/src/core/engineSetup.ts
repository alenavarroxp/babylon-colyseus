import * as BABYLON from 'babylonjs'

let engine: BABYLON.Engine
let scene: BABYLON.Scene

export function setupEngine (canvasId: string): { engine: BABYLON.Engine, scene: BABYLON.Scene } {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement
  engine = new BABYLON.Engine(canvas, true)
  scene = new BABYLON.Scene(engine)

  window.addEventListener('resize', () => {
    engine.resize()
  })

  return { engine, scene }
}

export function getScene (): BABYLON.Scene {
  return scene
}

export function getEngine (): BABYLON.Engine {
  return engine
}
