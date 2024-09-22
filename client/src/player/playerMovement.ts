import * as BABYLON from 'babylonjs'
import { getPlayers } from './createPlayer'

const movement = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  up: false,
  down: false
}

const previousPosition = new BABYLON.Vector3(0, 0, 0)
const myID: string = ''

export function handleMovement (room: any): void {
  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'w': movement.forward = true; break
      case 's': movement.backward = true; break
      case 'a': movement.left = true; break
      case 'd': movement.right = true; break
      case ' ': movement.up = true; break
      case 'Shift': movement.down = true; break
    }
  })

  window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'w': movement.forward = false; break
      case 's': movement.backward = false; break
      case 'a': movement.left = false; break
      case 'd': movement.right = false; break
      case ' ': movement.up = false; break
      case 'Shift': movement.down = false; break
    }
  })

  const players = getPlayers()

  // Actualiza el movimiento del jugador
  function updatePlayerMovement (room: any): void {
    if (myID !== '' || !(myID in players)) return

    const player = players[myID]

    const velocity = new BABYLON.Vector3()
    if (movement.forward) velocity.z += 0.1
    if (movement.backward) velocity.z -= 0.1
    if (movement.left) velocity.x -= 0.1
    if (movement.right) velocity.x += 0.1
    if (movement.up) velocity.y += 0.1
    if (movement.down) velocity.y -= 0.1

    player.position.addInPlace(velocity)

    if (hasPositionChanged(player.position, previousPosition)) {
      room.send('move', { position: player.position })
      previousPosition.copyFrom(player.position)
    }
  }

  setInterval(() => updatePlayerMovement(room), 16) // Aproximadamente 60 FPS
}

function hasPositionChanged (currentPosition: BABYLON.Vector3, previousPosition: BABYLON.Vector3): boolean {
  const threshold = 0.05
  return Math.abs(currentPosition.x - previousPosition.x) > threshold ||
         Math.abs(currentPosition.y - previousPosition.y) > threshold ||
         Math.abs(currentPosition.z - previousPosition.z) > threshold
}

export function updatePlayerPosition (id: string, position: BABYLON.Vector3): void {
  const players = getPlayers()
  const player = players[id]

  if (player !== undefined) {
    player.position = position // Actualiza la posición del jugador
  }
}
