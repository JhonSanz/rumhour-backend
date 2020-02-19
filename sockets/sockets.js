const io = require('../index')
const { Post } = require('../models/posts/post')

io.on('connection', function (socket) {
    Post.find({}, (err, posts) => {
        socket.emit('enviarMensaje', {
            posts: posts
        });
    })
    socket.on('created', function (data, fn) {
        Post.findById(data.identifier, function (err, post) {
            socket.emit('NEW', post);
            socket.broadcast.emit('NEW', post);
        });
    });
});
