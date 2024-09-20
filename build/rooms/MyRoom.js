"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colyseus_1 = require("colyseus");
class MyRoom extends colyseus_1.Room {
    constructor() {
        super();
        this.players = {};
    }
    onCreate() {
        this.players = {};
        // Manejar mensajes de movimiento
        this.onMessage("move", (client, message) => {
            console.log(`Received move from ${client.sessionId}:`, message);
            const player = this.players[client.sessionId];
            if (player) {
                player.position = message.position;
                // Enviar actualización a todos los jugadores
                this.broadcast("player_update", {
                    id: client.sessionId,
                    position: {
                        x: message.position.x,
                        y: message.position.y,
                        z: message.position.z,
                    },
                });
            }
            else {
                console.log(`No player found for ${client.sessionId}`);
            }
        });
    }
    onJoin(client) {
        console.log("Client joined!", client.sessionId);
        this.players[client.sessionId] = {
            position: {
                x: Math.random() * 10,
                y: Math.random() * 10,
                z: Math.random() * 10,
            },
        };
        // Enviar información inicial de todos los jugadores al nuevo cliente
        client.send("init_players", this.players);
        // Notificar a los demás jugadores que un nuevo jugador ha entrado
        this.broadcast("player_update", {
            id: client.sessionId,
            position: this.players[client.sessionId].position,
        });
    }
    onLeave(client) {
        console.log("Client left!", client.sessionId);
        delete this.players[client.sessionId];
        // Notificar a los demás que el jugador se ha desconectado
        this.broadcast("player_left", { id: client.sessionId });
    }
    onDispose() {
        console.log("Room disposed!");
    }
}
exports.default = MyRoom;
