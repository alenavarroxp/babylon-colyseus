"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMovement = handleMovement;
exports.updatePlayerPosition = updatePlayerPosition;
const BABYLON = __importStar(require("babylonjs"));
const createPlayer_1 = require("./createPlayer");
const movement = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false
};
const previousPosition = new BABYLON.Vector3(0, 0, 0);
const myID = '';
function handleMovement(room) {
    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'w':
                movement.forward = true;
                break;
            case 's':
                movement.backward = true;
                break;
            case 'a':
                movement.left = true;
                break;
            case 'd':
                movement.right = true;
                break;
            case ' ':
                movement.up = true;
                break;
            case 'Shift':
                movement.down = true;
                break;
        }
    });
    window.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'w':
                movement.forward = false;
                break;
            case 's':
                movement.backward = false;
                break;
            case 'a':
                movement.left = false;
                break;
            case 'd':
                movement.right = false;
                break;
            case ' ':
                movement.up = false;
                break;
            case 'Shift':
                movement.down = false;
                break;
        }
    });
    const players = (0, createPlayer_1.getPlayers)();
    // Actualiza el movimiento del jugador
    function updatePlayerMovement(room) {
        if (myID !== '' || !(myID in players))
            return;
        const player = players[myID];
        const velocity = new BABYLON.Vector3();
        if (movement.forward)
            velocity.z += 0.1;
        if (movement.backward)
            velocity.z -= 0.1;
        if (movement.left)
            velocity.x -= 0.1;
        if (movement.right)
            velocity.x += 0.1;
        if (movement.up)
            velocity.y += 0.1;
        if (movement.down)
            velocity.y -= 0.1;
        player.position.addInPlace(velocity);
        if (hasPositionChanged(player.position, previousPosition)) {
            room.send('move', { position: player.position });
            previousPosition.copyFrom(player.position);
        }
    }
    setInterval(() => updatePlayerMovement(room), 16); // Aproximadamente 60 FPS
}
function hasPositionChanged(currentPosition, previousPosition) {
    const threshold = 0.05;
    return Math.abs(currentPosition.x - previousPosition.x) > threshold ||
        Math.abs(currentPosition.y - previousPosition.y) > threshold ||
        Math.abs(currentPosition.z - previousPosition.z) > threshold;
}
function updatePlayerPosition(id, position) {
    const players = (0, createPlayer_1.getPlayers)();
    const player = players[id];
    if (player !== undefined) {
        player.position = position; // Actualiza la posición del jugador
    }
}
