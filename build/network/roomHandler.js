"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoomHandlers = setupRoomHandlers;
const createPlayer_1 = require("../player/createPlayer");
const playerMovement_1 = require("../player/playerMovement");
function setupRoomHandlers(room) {
    room.onMessage('init_MyPlayer', (myClient) => {
        console.log('My client ID:', myClient.id);
        (0, createPlayer_1.createPlayer)(myClient.id, myClient.position, room);
    });
    room.onMessage('init_players', (playersData) => {
        for (const id in playersData) {
            (0, createPlayer_1.createPlayer)(id, playersData[id].position, room);
        }
    });
    room.onMessage('player_update', (message) => {
        (0, playerMovement_1.updatePlayerPosition)(message.id, message.position);
    });
    room.onMessage('player_left', (message) => {
        (0, createPlayer_1.removePlayer)(message.id);
    });
}
