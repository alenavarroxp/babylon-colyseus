"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colyseus_1 = require("colyseus");
const clientService_1 = require("../services/clientService");
class MyRoom extends colyseus_1.Room {
    onCreate() {
        console.log('Room created!');
        this.onMessage('move', (client, data) => {
            this.updateClientPosition(client.sessionId, data);
        });
    }
    onJoin(client) {
        console.log('Client joined!', client);
        const newClient = {
            id: client.sessionId,
            position: {
                x: Math.random() * 10,
                y: Math.random() * 10,
                z: Math.random() * 10
            }
        };
        client.send('init_MyPlayer', newClient);
        client.send('init_players', (0, clientService_1.getClients)());
        (0, clientService_1.addClient)(newClient);
        console.log('Clientes', (0, clientService_1.getClients)());
        this.broadcast('player_update', newClient);
    }
    updateClientPosition(clientId, position) {
        const client = (0, clientService_1.getClientById)(clientId);
        if (client != null) {
            (0, clientService_1.updateClient)(clientId, position);
            console.log('Client position updated!', client);
            this.broadcast('player_update', (0, clientService_1.getClientById)(clientId));
        }
    }
    onLeave(client) {
        console.log('Client left!', client.sessionId);
        (0, clientService_1.deleteClient)(client.sessionId);
    }
    onDispose() {
        console.log('Room disposed!');
    }
}
exports.default = MyRoom;
