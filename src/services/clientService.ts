import { Client } from '../types/clientType'

const clients: Client[] = []

export const getClients = (): Client[] => {
  return clients
}

export const getClientById = (clientId: string): Client | undefined => {
  return clients.find((client) => client.id === clientId)
}

export const addClient = (newClient: Client): void => {
  clients.push(newClient)
}

export const deleteClient = (clientId: string): void => {
  const client = clients.find((client) => client.id === clientId)
  if (client != null) {
    const index = clients.indexOf(client)
    clients.splice(index, 1)
  }
}
