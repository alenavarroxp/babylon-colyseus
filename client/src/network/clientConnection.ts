import * as Colyseus from 'colyseus.js'
import { setupRoomHandlers } from './roomHandler'

export let room: any

export async function connectToServer (): Promise<any> {
  const client = new Colyseus.Client('ws://localhost:3000')

  try {
    room = await client.joinOrCreate('client')
    console.log('Joined room:', room)
    setupRoomHandlers(room)
    return room
  } catch (err) {
    console.error('Error joining room:', err)
    return null
  }
}
