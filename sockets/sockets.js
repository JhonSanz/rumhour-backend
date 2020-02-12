const io = require('../index')

io.on('connection', function (socket) {
    console.log('a user connected');
});