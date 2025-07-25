# QuickQueue

A **real-time group chat application** that supports multiple users chatting in a common room. Built with a focus on functionality, clean code structure, and optimal real-time experience.

## 🚀 Features

✅ **User Join Flow** - Username prompt before joining the chat  
✅ **Group Chat Room** - Single room for all users  
✅ **Real-Time Messaging** - Instant message delivery with username and timestamps  
✅ **Message History** - Last 20 messages persisted in memory for new users  
✅ **Auto-Scroll** - Automatically scroll to latest messages  
✅ **Professional UI** - Clean, dark-themed interface with NativeWind  
✅ **Error Handling** - Graceful handling of empty messages and invalid usernames  
✅ **Cross-Platform** - iOS and Android support

## 🛠️ Tech Stack

### Frontend

- **React Native CLI** (without Expo)
- **TypeScript** for type safety
- **NativeWind** (Tailwind CSS for React Native)
- **Socket.IO Client** for real-time communication
- **React Navigation** for screen routing

### Backend

- **Node.js** with Express.js
- **Socket.IO** for WebSocket communication
- **TypeScript** for type safety
- **In-Memory Storage** for message persistence (last 20 messages)
- **UUID** for unique message identifiers

## 📱 Application Architecture

```
QuickQueue/
├── client/          # React Native Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── screens/       # App screens (Welcome, Username, Chat)
│   │   ├── types/         # TypeScript definitions
│   │   └── utils/         # Helper functions
│   └── README.md
├── server/          # Node.js Backend
│   ├── src/
│   │   ├── socket/        # Socket.IO event handlers
│   │   ├── types/         # Message interfaces
│   │   └── config/        # Environment configuration
│   └── README.md
└── README.md        # This file
```

## 🎯 Key Features Implementation

### Real-Time Messaging

- **Socket.IO** WebSocket connection for instant message delivery
- **Message Broadcasting** to all connected users
- **Connection Status** indicators and error handling

### Message Management

- **In-Memory Buffer** maintaining last 20 messages (FIFO queue)
- **Message History** sent to new users upon joining
- **System Messages** for user join/leave notifications

### User Experience

- **Professional Onboarding** with welcome and username screens
- **Input Validation** with real-time feedback
- **Auto-Scroll** to latest messages for optimal UX
- **Dark Theme** with consistent styling throughout

### Error Handling

- **Username Validation** (2-30 characters, valid characters only)
- **Message Validation** (1-1000 characters, non-empty content)
- **Connection Error Recovery** with user-friendly messages
- **Server Error Handling** with comprehensive logging

## 🚦 Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **React Native CLI** development environment
- **Android Studio** (for Android) or **Xcode** (for iOS)

### Quick Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd QuickQueue
   ```

2. **Start the Backend Server**

   ```bash
   cd server
   npm install
   npm run dev
   ```

3. **Start the Frontend Client**

   ```bash
   cd client
   npm install
   npm start
   # In a new terminal:
   npm run android  # or npm run ios
   ```

4. **Start Chatting!**
   - Open the app on your device/emulator
   - Enter a username
   - Join the global chat room

### ✅ **Core Requirements**

- [x] User join flow with username prompt
- [x] Single group chat room for all users
- [x] Real-time messaging with usernames and timestamps
- [x] Last 20 messages persisted in memory (not database)
- [x] Minimal UI with message input and styled message list
- [x] Basic error handling for empty inputs

### ✅ **Technical Implementation**

- [x] **Frontend**: React Native CLI (no Expo)
- [x] **Backend**: Node.js with Socket.IO WebSocket
- [x] **Real-time**: Low latency message delivery
- [x] **Code Structure**: Modular, clean, and well-organized
- [x] **Best Practices**: Error handling, TypeScript, proper validation

### ✅ **User Experience**

- [x] Auto-scroll to latest messages
- [x] Clean, professional interface
- [x] Responsive design with proper keyboard handling
- [x] Connection status indicators

## 🔧 Development Scripts

### Server

```bash
npm run dev    # Start with auto-reload
npm run build  # Build TypeScript
npm start      # Production start
```

### Client

```bash
npm start      # Start Metro bundler
npm run android # Run on Android
npm run ios    # Run on iOS
npm test       # Run tests
```

## 📚 Documentation

- **[Server Setup](./server/README.md)** - Backend installation and configuration
- **[Client Setup](./client/README.md)** - Frontend installation and development

## 🎨 UI/UX Highlights

- **Dark Theme** with professional color scheme
- **Welcome Screen** with app feature overview
- **Username Input** with real-time validation
- **Chat Interface** with message grouping and timestamps
- **Auto-Scroll** behavior for optimal chat experience
- **Error States** with user-friendly messaging

## 🔄 Real-Time Communication Flow

1. **User connects** → Socket.IO establishes WebSocket connection
2. **Username submission** → Server validates and stores user
3. **Join notification** → System message broadcast to all users
4. **Message history** → Last 20 messages sent to new user
5. **Real-time messaging** → Instant broadcast to all connected clients
6. **User disconnect** → Leave notification and cleanup

## 🏆 Performance & Best Practices

- **TypeScript** throughout for type safety
- **Modular architecture** with separated concerns
- **Error boundaries** and comprehensive error handling
- **Memory management** with proper cleanup
- **Input validation** on both client and server
- **Professional logging** for debugging and monitoring

---
