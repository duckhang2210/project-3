const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//Connect DB
connectDB();

//Middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/chat', require('./routes/api/chat'));

//Serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

socketEvents = require('./config/socketEvents');

const PORT = process.env.PORT || 5000;

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
socketEvents(io);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
