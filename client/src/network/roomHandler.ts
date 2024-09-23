import { createPlayer, getPlayers, removePlayer } from "../player/createPlayer";
import { updatePlayerPosition } from "../player/playerMovement";

export let clientID: string;

export function setupRoomHandlers(room: any): void {
  room.onMessage("init_MyPlayer", (myClient: any) => {
    console.log("My client ID:", myClient.id);
    clientID = myClient.id;
    const player = createPlayer(myClient.id, myClient.position);
    console.log("Player:", player);
  });

  room.onMessage("init_players", (playersData: any) => {
    for (const id in playersData) {
      console.log("Player data:", playersData[id].id, playersData[id].position);
      createPlayer(playersData[id].id, playersData[id].position);
    }
  });

  room.onMessage("player_joined", (message: any) => {
    console.log("Player joined:", message.id);
    const players = getPlayers();
    
    if (players[message.id]) {
      console.log("Player already exists:", players[message.id].id);
      return;
    }
    
    createPlayer(message.id, message.position);
  });

  room.onMessage("player_update", (message: any) => {
    if (message.id === clientID) return;
    updatePlayerPosition(message.id, message.position);
  });

  room.onMessage("player_left", (message: any) => {
    console.log("Player left:", message.id);
    removePlayer(message.id);
  });
}
