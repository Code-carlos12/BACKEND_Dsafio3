const CartManager = require("../../../dao/mongoManagers/cartManager.js");
const cartManager = new CartManager();
const { Router} =  require("express");
const router = router();

router.get("/:id", async (req, res) => {
    //modifivar el id
    const id = "64d0584086f7aabe84215ef3"
    const cart = await cartManager.getCartById(id)
    res.render("cart", cart);
  });
  
  module.exports = router;