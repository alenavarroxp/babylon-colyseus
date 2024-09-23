import { monitor } from '@colyseus/monitor'
import { Server } from 'colyseus'
import express from 'express'
import http from 'http'
import MyRoom from './rooms/MyRoom'

import clientRouter from './routes/clientRoute'

const PORT = 3000

const app = express()
const server = http.createServer(app)
const gameServer = new Server({ server })

gameServer.define('client', MyRoom)
app.use('/colyseus', monitor())

app.use('/clients', clientRouter)

server.listen(PORT, () => {
  console.log('Listening on ws://localhost:3000')
})
