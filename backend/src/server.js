const express = require('express');
const http = require('http');
const hostname = 'localhost';
const port = 8080;

const app = express();

// Import and use routes
const pingRoutes = require('./routes/pingRoutes');
app.use(pingRoutes);

// Catch-all middleware
app.use((req, res) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is a test server</h1></body></html>');
});

const sample_server = http.createServer(app);

sample_server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
