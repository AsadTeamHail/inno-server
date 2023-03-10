const routes = require('express').Router();
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Items, ShopItems, Shops } = require('../../functions/associations/shopAssociation');
const {CustomerPurchase, Users} = require('../../functions/associations/customerPurchasesAssociation')

routes.post("/purchaseItems", async(req, res) => {
    
    console.log(req.body)

    var promises = (req.body).map((rqBody)=>{
      return rqBody.id!==""?CustomerPurchase.update({
        ShopItemId:rqBody.ShopItemId,
        ShopId:rqBody.ShopId,
        UserId:rqBody.UserId,
        status:rqBody.status,
        pd_price:rqBody.pd_price,
        total_price:rqBody.total_price,
        quantity:rqBody.quantity
      },
      {where:{id:rqBody.id}}):CustomerPurchase.create({
        ShopItemId:rqBody.ShopItemId,
        ShopId:rqBody.ShopId,
        UserId:rqBody.UserId,
        status:rqBody.status,
        pd_price:rqBody.pd_price,
        total_price:rqBody.total_price,
        quantity:rqBody.quantity
      })
    })
    try {
        const result = await Promise.all(promises)
        var message = {
          app_id: ONE_SIGNAL_CONFIG.APP_ID,
          contents:{"en":`Pay Pending Commission to Start receiving Calls Again`},
          included_segments:['included_player_ids'],
          include_player_ids:[`${req.body.device_id}`],
          content_available: true,
          small_icon:"ic_notification_icon",
          data:{
              PushTitle:"CUSTOM NOTIFICATION"
            },
            headings:{
              "en":"Account On Hold!"
            }
          }
          pushNotificationService.sendNotification(message, (error, results) => {});
          res.send(result);
        }
    catch (error) {
      res.send(error);
    }
});

routes.get("/getUpcomingOrders",async(req,res)=>{
    console.log(req.headers.id);
    try {
        const result = await CustomerPurchase.findAll({
        where:{ShopId:req.headers.id},
        include:[
          {model:ShopItems},
          {model:Users}],
        where:[{ShopId:req.headers.id},{status:'pending'}],
        });
        res.send(result);
    }
    catch (error) {
        res.send(error);
    }
})

routes.get("/getCompletedOrders",async(req,res)=>{
    console.log(req.headers.id);
    try {
        const result = await CustomerPurchase.findAll({
        where:{ShopId:req.headers.id},
        include:[
          {model:ShopItems},
          {model:Users}],
          where:[{ShopId:req.headers.id},{status:'completed'}],
        });
        res.send(result);
    }
    catch (error) {
        res.send(error);
    }
})

routes.post("/updateOrderStatus",async(req,res)=>{
  console.log(req.body.id);
try{
  const UpdateStatus = CustomerPurchase.update({status:'completed'},{where:{id:req.body.id}})
  res.send(UpdateStatus).status(200)
}catch(e){
  res.send(e)
}
})


module.exports = routes;