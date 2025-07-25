This is the **Node.js** backend server for QuickQueue, a real-time group chat application built with **Socket.IO** and **Express.js**.

# Getting Started

> **Note**: Make sure you have **Node.js** (v16 or higher) and **npm** installed on your system.

## Step 1: Install Dependencies

Navigate to the server directory and install the required packages:

```bash
cd server
npm install
```

## Step 2: Start the Development Server

Run the server in development mode with auto-reload:

```bash
# Using npm
npm run dev

# OR start without auto-reload
npm start
```

## Step 3: Production Build

For production deployment, build the TypeScript code and run:

```bash
# Build TypeScript to JavaScript
npm run build

# Run the built version
npm start
```

If everything is set up correctly, you should see:

```
Server listening on port 5000
```

The server will be running on `http://localhost:5000` and ready to accept Socket.IO connections from the QuickQueue client.

## Environment Configuration (Optional)

Create a `.env` file in the server root directory if you want to customize the port:

```bash
# .env
PORT=5000
```

## Development Scripts

```bash
# Start development server with auto-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start
```

# Troubleshooting

If you're having issues getting the server running:

**Port already in use:**

```bash
Error: listen EADDRINUSE: address already in use :::5000
```

- Change the port in `.env` file or kill the process using port 5000

**TypeScript compilation errors:**

```bash
npm run build
```

- Check TypeScript errors in the terminal output

**Module not found errors:**

```bash
npm install
```

- Make sure all dependencies are installed

# Learn More

To learn more about the technologies used:

- [Node.js Documentation](https://nodejs.org/en/docs/) - learn more about Node.js
- [Socket.IO Documentation](https://socket.io/docs/v4/) - real-time WebSocket communication
- [Express.js Guide](https://expressjs.com/en/guide/) - web framework for Node.js
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - typed JavaScript
