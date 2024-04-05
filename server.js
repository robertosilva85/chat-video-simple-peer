const http = require('http');
const { Server } = require('socket.io');

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

const peers = [];

io.on('connection', (socket) => {
  const ids = Array.from(io.of('/').sockets.keys());

  socket.emit('users-connected', ids);

  console.log('A user connected:', socket.id);

  socket.on('user-joined', (payload) => {
    try {
      peers.push(payload);

      io.emit('receive-peers', peers);
    } catch (ex) {
      console.log('Error Returning Signal:', ex);
    }
  });

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`user with id-${socket.id} joined room - ${roomId}`);
  });

  socket.on('send_msg', (data) => {
    console.log(data, 'DATA');
    //This will send a message to a specific room ID
    socket.to(data.roomId).emit('receive_msg', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
