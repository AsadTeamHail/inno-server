const router = require('express').Router();
const { Vendors } = require('../../models');

module.exports = function (io){

    io.on('connection', function (socket) {
        socket.on('send_message', async(data) => {
            console.log(data);
            const result = await Vendors.findAll({
                order: [['createdAt', 'DESC']], where:{approved:0}
            });
            await socket.broadcast.emit("receive_message", result)
        });
    });

    return router;
};