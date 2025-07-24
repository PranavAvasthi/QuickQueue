import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { PORT } from "./config/env";
import { connectDatabase } from "./config/database";
import { socketHandler } from "./socket";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.get("/", (_req, res) => {
  res.send("Server Health Check");
});

socketHandler(io);

const startServer = async () => {
  try {
    await connectDatabase();

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      console.log(`Socket.IO ready for connections`);
      console.log(`MongoDB connected`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
