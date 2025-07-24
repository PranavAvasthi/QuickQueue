import express from "express";
import http from "http";
import cors from "cors";
import { PORT } from "./config/env";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.get("/", (_req, res) => {
  res.send("Server Health Check");
});

server.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
