import * as BABYLON from 'babylonjs'

const players: Record<string, BABYLON.Mesh> = {}

export function createPlayer (
  id: string,
  position: BABYLON.Vector3,
  scene: BABYLON.Scene
): BABYLON.Mesh {
  const playerCube = BABYLON.MeshBuilder.CreateBox(id, { size: 2 }, scene)
  playerCube.position = position

  players[id] = playerCube
  return playerCube
}

export function getPlayers (): Record<string, BABYLON.Mesh> {
  return players
}

export function removePlayer (id: string): void {
  if (players[id] !== undefined) {
    players[id].dispose()
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete players[id]
  }
}
