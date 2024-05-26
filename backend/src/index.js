import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'

import { app } from './app.js'
import { connectDB } from './db/index.js';

const PORT = 3000;
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
      },
})

dotenv.config({
  path: './config.env'
})

app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    })
  );

await connectDB().then(() => {
  app.on('error', (err) => {
    console.log("ERROR ::", err)
    throw err;
  });
}).catch(err => console.log(err))


  app.get("/", (req, res) => {
    res.send("Hello World!");
  });



  /**
   * ! socket connections
   */

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on('vote', (data) => {
        socket.broadcast.emit('vote', {pollData:data.updatedPollData,user: data.user})
    })



    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id)
    })
})



server.listen(PORT, () => {
    console.log(`server listening at ${PORT}`)
})