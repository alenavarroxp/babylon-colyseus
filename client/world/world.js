
const BABYLON = require('babylonjs')
const Colyseus = require('colyseus.js')
let scene, engine, camera, cube, client, room
const players = {}
const movement = { forward: false, backward: false, left: false, right: false, up: false, down: false }
let previousPosition = { x: 0, y: 1, z: 0 }

document.addEventListener('DOMContentLoaded', () => {
  client = new Colyseus.Client('ws://localhost:3000')

  client.joinOrCreate('my_room').then(roomInstance => {
    room = roomInstance
    console.log('Joined room:', room)

    // Inicializa los jugadores
    room.onMessage('init_players', (playersData) => {
      console.log('Initializing players:', playersData)
      for (const id in playersData) {
        if (playersData.hasOwnProperty(id)) {
          createPlayer(id, playersData[id].position)
        }
      }
    })

    // Maneja las actualizaciones de otros jugadores
    room.onMessage('player_update', (message) => {
      console.log('Player update received:', message)
      if (!players[message.id]) {
        createPlayer(message.id, message.position)
      }
      updatePlayerPosition(message.id, message.position)
    })

    // Maneja cuando un jugador se desconecta
    room.onMessage('player_left', (message) => {
      console.log('Player left:', message)
      if (players[message.id]) {
        players[message.id].dispose()
        delete players[message.id]
      }
    })

    initBabylonScene()
    handleMovement(room)
  }).catch(err => {
    console.error('Error joining room:', err)
  })
})

function initBabylonScene () {
  const canvas = document.getElementById('renderCanvas')
  engine = new BABYLON.Engine(canvas, true)
  scene = new BABYLON.Scene(engine)

  // Crear una cámara y una luz
  camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene)
  camera.setTarget(BABYLON.Vector3.Zero())
  camera.attachControl(canvas, true)

  const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene)
  light.intensity = 0.7

  // Crear tu propio cubo
  cube = BABYLON.MeshBuilder.CreateBox('cube', { size: 2 }, scene)
  cube.position.y = 1
  players.self = cube

  engine.runRenderLoop(() => {
    scene.render()
    updatePlayerMovement()
  })

  window.addEventListener('resize', () => {
    engine.resize()
  })
}

function createPlayer (id, position) {
  console.log('Creating player:', id, position)
  const playerCube = BABYLON.MeshBuilder.CreateBox(id, { size: 2 }, scene)
  playerCube.position = new BABYLON.Vector3(position.x, position.y, position.z)
  console.log('Player created:', playerCube.position)
  players[id] = playerCube
}

function updatePlayerPosition (id, position) {
  console.log('Updating player position:', id, position)
  if (players[id]) {
    console.log('ACTUALIZAR POSICIÓN')
    players[id].position.x = position.x
    players[id].position.y = position.y
    players[id].position.z = position.z
  }
}

function handleMovement (room) {
  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'w':
        movement.forward = true
        break
      case 's':
        movement.backward = true
        break
      case 'a':
        movement.left = true
        break
      case 'd':
        movement.right = true
        break
      case ' ':
        movement.up = true
        break
      case 'Shift':
        movement.down = true
        break
    }
  })

  window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'w':
        movement.forward = false
        break
      case 's':
        movement.backward = false
        break
      case 'a':
        movement.left = false
        break
      case 'd':
        movement.right = false
        break
      case ' ':
        movement.up = false
        break
      case 'Shift':
        movement.down = false
        break
    }
  })
}

function updatePlayerMovement () {
  const velocity = new BABYLON.Vector3()

  if (movement.forward) velocity.z += 0.1
  if (movement.backward) velocity.z -= 0.1
  if (movement.left) velocity.x -= 0.1
  if (movement.right) velocity.x += 0.1
  if (movement.up) velocity.y += 0.1
  if (movement.down) velocity.y -= 0.1

  cube.position.addInPlace(velocity)

  // Solo enviamos el mensaje si la posición ha cambiado significativamente
  if (hasPositionChanged(cube.position, previousPosition)) {
    console.log('Sending movement to server:', cube.position)
    room.send('move', {
      position: {
        x: cube.position.x,
        y: cube.position.y,
        z: cube.position.z
      }
    })
    previousPosition = {
      x: cube.position.x,
      y: cube.position.y,
      z: cube.position.z
    }
  }
}

function hasPositionChanged (currentPosition, previousPosition) {
  const threshold = 0.01 // Define qué tan sensible es el cambio
  return Math.abs(currentPosition.x - previousPosition.x) > threshold ||
                Math.abs(currentPosition.y - previousPosition.y) > threshold ||
                Math.abs(currentPosition.z - previousPosition.z) > threshold
}
