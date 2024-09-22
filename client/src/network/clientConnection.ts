import * as Colyseus from 'colyseus.js'

export function connectToServer (): any {
  const client = new Colyseus.Client('ws://localhost:3000')

  let room
  client.joinOrCreate('client')
    .then(roomInstance => {
      room = roomInstance
      console.log('Joined room:', room)
    })
    .catch(err => {
      console.error('Error joining room:', err)
    })

  return { room }
}
