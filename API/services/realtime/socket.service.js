
const io = require("socket.io");

module.exports = (host, corsOrigin, callback) => {

    console.log("Preparing socket server", corsOrigin)

    return new Promise(
        (resolve, reject) => {
            socket = io(host, {
                cors: {
                    origin: corsOrigin,
                    credentials: true
                }
            });
            socket.on("connection", (client) => {

                console.log("Socket connection was made by " + client.id);

                client.on('disconnect', () => {
                    console.log(client.id + "was disconnected ");
                });

                callback(socket, client);
                resolve(socket)
            })
        }
    )

}