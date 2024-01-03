

module.exports = io => {
    io.on('connection', socket => {
        console.log('New socket connection 5555');

        let currentCode = null;
        
        socket.on('joinGame', function(data) {

            currentCode = data.code;
            socket.join(currentCode);
            if (!games[currentCode]) {
                games[currentCode] = true;
                return;
            }
            io.to(currentCode).emit('startGame');
        });

        socket.on("new_message", data => {
            console.log("new messsage " + data.msg);
            io.sockets.emit("receive_message", { msg: data.msg})
          });

        socket.on("turnChange", data => {
            console.log("เทินของสี " + data);
            if(data == "white"){
                io.sockets.emit("changeTurn","black");
            }else{
                io.sockets.emit("changeTurn","white");
            }
        });

        socket.on('disconnect', function() {
            console.log('socket disconnected');

            if (currentCode) {
                io.to(currentCode).emit('gameOverDisconnect');
                delete games[currentCode];
            }
        });

    });
};