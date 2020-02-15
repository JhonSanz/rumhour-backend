const io = require('../index')
const { Post } = require('../models/posts/post')

io.on('connection', function (socket) {
    Post.find({}, (err, posts) => {
        socket.emit('enviarMensaje', {
            posts: posts
        });
    })
    socket.on('hi', function () {
        socket.emit('NEW', {title: "hello", body: "from websocket"});
        socket.broadcast.emit('NEW', {title: "hello", body: "from websocket"});
    });
});