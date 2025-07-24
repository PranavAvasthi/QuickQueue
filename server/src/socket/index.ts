import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../types/message";

const messageBuffer: Message[] = [];
const users: Map<string, string> = new Map();

// Helper function to add message to buffer with size limit
const addMessageToBuffer = (message: Message) => {
  if (messageBuffer.length >= 20) {
    messageBuffer.shift();
  }
  messageBuffer.push(message);
};

export const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join", (username: string) => {
      if (!username?.trim()) return;

      socket.data.username = username;
      users.set(socket.id, username);
      console.log(`${username} joined the chat`);

      // Send message history to new user
      socket.emit("message_history", messageBuffer);

      // Notify others
      const joinMessage: Message = {
        id: uuidv4(),
        username: "System",
        text: `${username} joined the chat`,
        timestamp: Date.now(),
      };

      addMessageToBuffer(joinMessage);
      io.emit("new_message", joinMessage);

      // Send updated user list
      io.emit("user_list", Array.from(users.values()));
    });

    socket.on("message", (text: string) => {
      const username = socket.data.username;
      if (!text?.trim() || !username) return;

      const message: Message = {
        id: uuidv4(),
        username,
        text,
        timestamp: Date.now(),
      };

      addMessageToBuffer(message);

      io.emit("new_message", message);
    });

    socket.on("disconnect", () => {
      const username = users.get(socket.id);
      if (username) {
        users.delete(socket.id);
        console.log(`${username} disconnected`);

        // Notify others
        const leaveMessage: Message = {
          id: uuidv4(),
          username: "System",
          text: `${username} left the chat`,
          timestamp: Date.now(),
        };

        addMessageToBuffer(leaveMessage);
        io.emit("new_message", leaveMessage);

        // Update user list
        io.emit("user_list", Array.from(users.values()));
      }
    });
  });
};
