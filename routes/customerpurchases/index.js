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
        res.send(result);
    }
    catch (error) {
      res.send(error);
    }
});

routes.get("/getPurchasedItemsVendor",async(req,res)=>{
    console.log(req.headers.id);
    try {
        const result = await CustomerPurchase.findAll({
<<<<<<< HEAD
        where:{ShopId:req.headers.id},
        include:[
          {model:ShopItems},
          {model:Users}],
=======
        where:[{ShopId:req.headers.id}],
>>>>>>> c8023b68bbaa69478815a55a0902a7c885b9a453
        });
        res.send(result);
    }
    catch (error) {
        res.send(error);
    }
})

module.exports = routes;