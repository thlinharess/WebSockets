import express  from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";

import "./dbConnect.js";

const app = express();
const door = process.env.door || 3000;

const currentPath = url.fileURLToPath(import.meta.url);
const publicDirectory = path.join(currentPath, "../..", "Public");
app.use(express.static(publicDirectory));

const httpServer = http.createServer(app);

httpServer.listen(door, () => 
   console.log(`Server listen in door ${door}`)
);

const io = new Server(httpServer);

export default io;