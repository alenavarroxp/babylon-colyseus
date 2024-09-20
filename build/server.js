"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const monitor_1 = require("@colyseus/monitor");
const colyseus_1 = require("colyseus");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const MyRoom_1 = __importDefault(require("./rooms/MyRoom"));
const babylon_1 = __importDefault(require("./routes/babylon"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const gameServer = new colyseus_1.Server({ server });
gameServer.define("my_room", MyRoom_1.default);
app.use("/colyseus", (0, monitor_1.monitor)());
app.use("/babylon", babylon_1.default);
server.listen(3000, () => {
    console.log("Listening on ws://localhost:3000");
});
