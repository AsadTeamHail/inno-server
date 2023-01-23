const routes = require('express').Router();
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Items, ShopItems, Shops } = require('../../functions/associations/shopAssociation');
const {CustomerPurchase} = require('../../functions/associations/customerPurchasesAssociation')

routes.post("/purchasedItems", async(req, res) => {
    
    console.log(req.body)

    var promises = (req.body).map((rqBody)=>{
      return rqBody.id!==""?CustomerPurchase.update({
        ShopItemId:rqBody.ShopItemId,
        ShopId:rqBody.ShopId,
        UserId:rqBody.UserId,
        total_price:rqBody.total_price,
        quantity:rqBody.quantity
      },
      {where:{id:rqBody.id}}):CustomerPurchase.create({
        ShopItemId:rqBody.ShopItemId,
        ShopId:rqBody.ShopId,
        UserId:rqBody.UserId,
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
        console.log(req.body);
    try {
        const result = await CustomerPurchase.findOne({
        where:[{ShopId:req.body.id}],
        });
        res.send(result);
    }
    catch (error) {
        res.send(error);
    }
})

module.exports = routes;