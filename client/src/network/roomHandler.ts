import { createPlayer, removePlayer } from '../player/createPlayer'
import { updatePlayerPosition } from '../player/playerMovement'

export function setupRoomHandlers (room: any): void {
  room.onMessage('init_MyPlayer', (myClient: any) => {
    console.log('My client ID:', myClient.id)
    createPlayer(myClient.id, myClient.position, room)
  })

  room.onMessage('init_players', (playersData: any) => {
    for (const id in playersData) {
      createPlayer(id, playersData[id].position, room)
    }
  })

  room.onMessage('player_update', (message: any) => {
    updatePlayerPosition(message.id, message.position)
  })

  room.onMessage('player_left', (message: any) => {
    removePlayer(message.id)
  })
}
