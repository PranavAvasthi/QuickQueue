import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../types/message";

const messageBuffer: Message[] = [];
const users = new Map<string, string>(); // socketId -> username
const MAX_MESSAGES = 20;

/**
 * Add message to buffer and maintain size limit
 */
const addMessageToBuffer = (message: Message): void => {
  messageBuffer.push(message);

  // Keep only last 20 messages
  if (messageBuffer.length > MAX_MESSAGES) {
    messageBuffer.shift(); // Remove oldest message
  }
};

/**
 * Get all online users
 */
const getOnlineUsers = (): string[] => {
  return Array.from(users.values());
};

export const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Handle user joining the chat
    socket.on("join", (username: string) => {
      // Validate username
      if (
        !username?.trim() ||
        username.trim().length < 2 ||
        username.trim().length > 30
      ) {
        socket.emit("error", "Invalid username. Must be 2-30 characters.");
        return;
      }

      const trimmedUsername = username.trim();

      // Store user info
      socket.data.username = trimmedUsername;
      users.set(socket.id, trimmedUsername);

      console.log(`${trimmedUsername} joined the chat`);

      // Send message history to new user (last 20 messages from memory)
      socket.emit("message_history", messageBuffer);

      // Create and broadcast join message
      const joinMessage: Message = {
        id: uuidv4(),
        username: "System",
        text: `${trimmedUsername} joined the chat`,
        timestamp: Date.now(),
      };

      addMessageToBuffer(joinMessage);
      io.emit("new_message", joinMessage);

      // Send updated user list to all clients
      io.emit("user_list", getOnlineUsers());
    });

    // Handle new messages
    socket.on("message", (text: string) => {
      const username = socket.data.username;

      if (!username) {
        socket.emit("error", "You must join the chat first");
        return;
      }

      // Validate message
      if (!text?.trim() || text.trim().length === 0) {
        socket.emit("error", "Message cannot be empty");
        return;
      }

      if (text.trim().length > 1000) {
        socket.emit("error", "Message too long (max 1000 characters)");
        return;
      }

      // Create message object
      const message: Message = {
        id: uuidv4(),
        username,
        text: text.trim(),
        timestamp: Date.now(),
      };

      console.log(`Message from ${username}: ${text.trim()}`);

      // Add to message buffer
      addMessageToBuffer(message);

      // Broadcast message to all clients
      io.emit("new_message", message);
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      const username = socket.data.username;

      if (username && users.has(socket.id)) {
        console.log(`${username} left the chat`);

        // Remove user from users map
        users.delete(socket.id);

        // Create and broadcast leave message
        const leaveMessage: Message = {
          id: uuidv4(),
          username: "System",
          text: `${username} left the chat`,
          timestamp: Date.now(),
        };

        addMessageToBuffer(leaveMessage);
        io.emit("new_message", leaveMessage);

        // Send updated user list to remaining clients
        io.emit("user_list", getOnlineUsers());
      }
    });

    // Handle connection errors
    socket.on("error", (error) => {
      console.error(`Socket error for ${socket.id}:`, error);
    });
  });

  // Global error handling
  io.on("connect_error", (error) => {
    console.error("Connection error:", error);
  });
};
