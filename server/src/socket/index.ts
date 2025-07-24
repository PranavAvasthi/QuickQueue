import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { Message as MessageType } from "../types/message";
import { Message } from "../models/Message";
import { User } from "../models/User";

export const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join", async (username: string) => {
      if (!username?.trim()) return;

      try {
        socket.data.username = username;

        // Create or update user in database
        await User.findOneAndUpdate(
          { socketId: socket.id },
          {
            username: username.trim(),
            socketId: socket.id,
            isOnline: true,
            lastSeen: new Date(),
            joinedAt: new Date(),
          },
          { upsert: true, new: true }
        );

        console.log(`${username} joined the chat`);

        // Send message history to new user (last 20 messages)
        const messages = await Message.find()
          .sort({ timestamp: -1 })
          .limit(20)
          .exec();

        // Convert to frontend format and reverse for chronological order
        const messageHistory = messages.reverse().map((msg) => ({
          id: msg.id,
          username: msg.username,
          text: msg.text,
          timestamp: msg.timestamp,
        }));

        socket.emit("message_history", messageHistory);

        // Create and save join message
        const joinMessage = new Message({
          id: uuidv4(),
          username: "System",
          text: `${username} joined the chat`,
          timestamp: Date.now(),
          messageType: "system",
        });

        await joinMessage.save();

        // Broadcast join message
        const joinMsgForClient: MessageType = {
          id: joinMessage.id,
          username: joinMessage.username,
          text: joinMessage.text,
          timestamp: joinMessage.timestamp,
        };
        io.emit("new_message", joinMsgForClient);

        // Send updated user list
        const onlineUsers = await User.find({ isOnline: true }).select(
          "username"
        );
        const userList = onlineUsers.map((user) => user.username);
        io.emit("user_list", userList);

        // Clean up old messages (keep only last 100)
        const messageCount = await Message.countDocuments();
        if (messageCount > 100) {
          const messagesToDelete = messageCount - 100;
          const oldMessages = await Message.find()
            .sort({ timestamp: 1 })
            .limit(messagesToDelete)
            .select("_id");

          const idsToDelete = oldMessages.map((msg) => msg._id);
          await Message.deleteMany({ _id: { $in: idsToDelete } });
          console.log(`Cleaned up ${messagesToDelete} old messages`);
        }
      } catch (error) {
        console.error("Error handling user join:", error);
      }
    });

    socket.on("message", async (text: string) => {
      const username = socket.data.username;
      if (!text?.trim() || !username) return;

      try {
        // Create and save message
        const message = new Message({
          id: uuidv4(),
          username,
          text: text.trim(),
          timestamp: Date.now(),
          messageType: "user",
        });

        await message.save();

        // Broadcast message to all clients
        const messageForClient: MessageType = {
          id: message.id,
          username: message.username,
          text: message.text,
          timestamp: message.timestamp,
        };
        io.emit("new_message", messageForClient);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("disconnect", async () => {
      try {
        // Find and update user as offline
        const user = await User.findOneAndUpdate(
          { socketId: socket.id },
          {
            isOnline: false,
            lastSeen: new Date(),
          },
          { new: true }
        );

        if (user) {
          const username = user.username;
          console.log(`${username} disconnected`);

          // Create and save leave message
          const leaveMessage = new Message({
            id: uuidv4(),
            username: "System",
            text: `${username} left the chat`,
            timestamp: Date.now(),
            messageType: "system",
          });

          await leaveMessage.save();

          // Broadcast leave message
          const leaveMsgForClient: MessageType = {
            id: leaveMessage.id,
            username: leaveMessage.username,
            text: leaveMessage.text,
            timestamp: leaveMessage.timestamp,
          };
          io.emit("new_message", leaveMsgForClient);

          // Send updated user list
          const onlineUsers = await User.find({ isOnline: true }).select(
            "username"
          );
          const userList = onlineUsers.map((user) => user.username);
          io.emit("user_list", userList);
        }
      } catch (error) {
        console.error("Error handling user disconnect:", error);
      }
    });
  });
};
