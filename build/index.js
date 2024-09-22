"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sceneSetup_1 = require("./core/sceneSetup");
const clientConnection_1 = require("./network/clientConnection");
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa la escena de BabylonJS
    const { room } = (0, clientConnection_1.connectToServer)();
    (0, sceneSetup_1.initBabylonScene)(room);
});
