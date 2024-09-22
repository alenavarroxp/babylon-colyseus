import { Room } from 'colyseus'
import {
  addClient,
  deleteClient,
  getClientById,
  getClients,
  updateClient
} from '../services/clientService'
import { Client } from '../types/clientType'

export default class MyRoom extends Room {
  onCreate (): void {
    console.log('Room created!')
    this.onMessage('move', (client, data) => {
      this.updateClientPosition(client.sessionId, data)
    })
  }

  onJoin (client: any): void {
    console.log('Client joined!', client)
    const newClient: Client = {
      id: client.sessionId,
      position: {
        x: Math.random() * 10,
        y: Math.random() * 10,
        z: Math.random() * 10
      }
    }

    client.send('init_MyPlayer', newClient)

    client.send('init_players', getClients())
    addClient(newClient)
    console.log('Clientes', getClients())

    this.broadcast('player_update', newClient)
  }

  private updateClientPosition (clientId: string, position: any): void {
    const client = getClientById(clientId)
    if (client != null) {
      updateClient(clientId, position)

      console.log('Client position updated!', client)
      this.broadcast('player_update', getClientById(clientId))
    }
  }

  onLeave (client: any): void {
    console.log('Client left!', client.sessionId)
    deleteClient(client.sessionId)
  }

  onDispose (): void {
    console.log('Room disposed!')
  }
}
