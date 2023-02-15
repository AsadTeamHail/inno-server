const {ONE_SIGNAL_CONFIG} = require('../config/onesignal.config')
const pushNotificationService = require('../services/push-notification-service')

exports.sendNotification = (req, res, next) => {
    var message = {
        app_id: ONE_SIGNAL_CONFIG.APP_ID,
        contents:{"en":"Weekly Invoice Update"},
        //contents:{"en":`${req.body.msg}`},
        included_segments:['All'],
        content_available: true,
        small_icon:"ic_notification_icon",
        data:{
            PushTitle:"CUSTOM NOTIFICATION"
        }
    }

    pushNotificationService.sendNotification(message, (error, results) => {
        if(error){
            return next(error)
        }
        return console.log(results)
    });
};

exports.sendNotificationToDevice = (req, res, next) => {
    var message = {
        app_id: ONE_SIGNAL_CONFIG.APP_ID,
        contents:{"en":`${req.body.msg}`},
        included_segments:['included_player_ids'],
        include_player_ids:req.body.devices,
        content_available: true,
        small_icon:"ic_notification_icon",
        data:{
            PushTitle:"CUSTOM NOTIFICATION"
        },
        headings:{
            "en":req.body.heading
        }
    }

    pushNotificationService.sendNotification(message, (error, results) => {
        if(error){
            return next(error)
        }
        return res.status(200).send({
            message: "Success",
            data: "results"
        });
    });
};