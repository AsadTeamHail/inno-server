module.exports = (io, socket) => {

    const createOrder = (payload) => {
        console.log(payload)
        socket.emit("receive_message", payload);
    }

    socket.on("send_message", createOrder);
}