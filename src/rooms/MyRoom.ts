import { Room } from 'colyseus'
import {
  addClient,
  deleteClient,
  getClientById,
  getClients
} from '../services/clientService'
import { Client } from '../types/clientType'

export default class MyRoom extends Room {
  onCreate (): void {
    console.log('Room created!')
  }

  onJoin (client: any): void {
    console.log('Client joined!')
    const newClient: Client = {
      id: client.sessionId,
      position: {
        x: Math.random() * 10,
        y: Math.random() * 10,
        z: Math.random() * 10
      }
    }
    addClient(newClient)

    console.log('Clientes', getClients())

    client.send('init_players', getClients())

    this.broadcast('player_update', getClientById(newClient.id))
  }

  onLeave (client: any): void {
    console.log('Client left!', client.sessionId)
    deleteClient(client.sessionId)
    // delete this.players[client.sessionId]
    // // Notificar a los demás que el jugador se ha desconectado
    // this.broadcast('player_left', { id: client.sessionId })
  }

  onDispose (): void {
    console.log('Room disposed!')
  }
}
