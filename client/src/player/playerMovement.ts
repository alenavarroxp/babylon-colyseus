import * as BABYLON from 'babylonjs'
import { getCamera } from '../core/sceneSetup'
import { clientID } from '../network/roomHandler'
import { getPlayers } from './createPlayer'

const movement = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  up: false,
  down: false
}

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

  // Actualiza el movimiento del jugador
  setInterval(() => updatePlayerMovement(room), 16) // Aproximadamente 60 FPS
}

function updatePlayerMovement (room: any): void {
  const players = getPlayers()
  const player = players[clientID]

  const velocity = new BABYLON.Vector3(
    (movement.right ? 1 : 0) - (movement.left ? 1 : 0),
    (movement.up ? 1 : 0) - (movement.down ? 1 : 0),
    (movement.backward ? 1 : 0) - (movement.forward ? 1 : 0)
  )

  player.position.addInPlace(velocity.scale(0.1))

  if (velocity.length() > 0) {
    changeCameraTarget(player.position)
    updateCameraPosition(player.position)
    
    room.send('move', { id: clientID, position: player.position })
  }
}

export function changeCameraTarget (position: BABYLON.Vector3): void {
  const camera = getCamera()
  camera.setTarget(position)
}

function updateCameraPosition (position: BABYLON.Vector3): void {
  const camera = getCamera()
  camera.position = position.add(new BABYLON.Vector3(0, 10, -10))
}

export function updatePlayerPosition (id: string, position: BABYLON.Vector3): void {
  console.log('Updating player position:', id, position)
  const players = getPlayers()
  const player = players[id]

  if (player !== undefined) {
    player.position = position
  }
}
