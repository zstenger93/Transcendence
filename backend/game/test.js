const websocketUrl = 'ws://localhost:8000/wss/game/asdfasdf/';

// Create a new WebSocket instance
const websocket = new WebSocket(websocketUrl);

// Event listener for WebSocket connection open
websocket.onopen = function(event) {
  console.log('WebSocket connection opened.');
  
  // Sending a test message to the server
  websocket.send(JSON.stringify({ message: 'Hello from the client!' }));
};

// Event listener for WebSocket messages received
websocket.onmessage = function(event) {
  console.log('Message received from server:', event.data);
  
  // You can add further processing of the received message here
};

// Event listener for WebSocket errors
websocket.onerror = function(error) {
  console.error('WebSocket error:', error);
};

// Event listener for WebSocket connection close
websocket.onclose = function(event) {
  console.log('WebSocket connection closed.');
};