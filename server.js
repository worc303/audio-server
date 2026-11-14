const WebSocket = require('ws');
const port = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: port });

wss.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('message', (data, isBinary) => {
    // Пересылаем сообщение всем, кроме отправителя
    wss.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`Server started on port ${port}`);
