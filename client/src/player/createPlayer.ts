import * as BABYLON from 'babylonjs'
import { getScene } from '../core/engineSetup'

const players: Record<string, BABYLON.Mesh> = {}

export function createPlayer (
  id: string,
  position: { x: number, y: number, z: number }
): BABYLON.Mesh {
  console.log('Creating player:', id, position)
  const scene = getScene()

  const playerCube = BABYLON.MeshBuilder.CreateBox(id, { size: 2 }, scene)
  playerCube.position = new BABYLON.Vector3(position.x, position.y, position.z)

  players[id] = playerCube

  return playerCube
}

export function getPlayers (): Record<string, BABYLON.Mesh> {
  return players
}

export function removePlayer (id: string): void {
  if (players[id] !== null) {
    console.log('Player removed:', id)

    players[id].dispose()
    delete players[id]
  }
}
