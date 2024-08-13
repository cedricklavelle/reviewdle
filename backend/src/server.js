const express = require('express');
const http = require('http');
const hostname = 'localhost';
const port = 8080;
const connectDB = require('./config/db'); // Import the connectDB function
const movieRoutes = require('./routes/movieRoutes');

const app = express();

connectDB()

// Import and use routes
const pingRoutes = require('./routes/pingRoutes');
app.use(pingRoutes);
app.use("/",movieRoutes);
app.use(express.json());
;

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
