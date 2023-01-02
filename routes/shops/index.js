const routes = require('express').Router();
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

//const { Shops } = require('../../models');
const { Shops } = require('../../functions/associations/shopAssociation')

routes.get("/getNearByShops", async(req, res) => {

  const {lat, long} = req.headers;

  try {
      const value = await Shops.findAll({
        where:{
          long:{
            [Op.between]: [Number(long)-0.02, Number(long)+0.02],
          },
          lat:{
            [Op.between]: [Number(lat)-0.002, Number(lat)+0.002],
          },
        }
      });
      res.send(value);
  }
  catch (error) {
    res.send(error);
  }
});

routes.post("/shopCreation", async(req, res) => {

  try {
      const value = await Shops.create({
        ShopUserId:req.body.ShopUserId,
        name:req.body.name, type:req.body.type,
        country:req.body.country, city:req.body.city,
        opening:req.body.opening, closing:req.body.closing,
        address:req.body.address, long:req.body.long, lat:req.body.lat
      });
      res.json({status:'success', result:value});
  }
  catch (error) {
    res.json({status:'error'});
  }
});

routes.get("/loadVendorShop", async(req, res) => {

  try {
      const value = await Shops.findOne({ where:{ShopUserId:req.headers.id} });
      res.json({status:'success', result:value});
  }
  catch (error) {
    res.json({status:'error'});
  }
});

// ---------------------  Experimental Api ---------------------

// routes.post("/createBulkShops", async(req, res) => {
//   console.log(req.body)
//   try {
//         const value = await Shops.bulkCreate(req.body);
//         res.send(value);
//   }
//   catch (error) {
//     res.send(error);
//   }
// });

module.exports = routes;