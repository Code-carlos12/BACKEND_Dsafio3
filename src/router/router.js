const productRouter = require("../managers/products/product.router.js");
const cartRouter = require("../managers/cart/cart.router.js");
const viewsControllerAsinc = require("../managers/views/controller.views.js");
const viewsControllerSinc = require("../managers/views/controller.viewsSinc.js");

const router = (app) =>{
    app.use("/api/products", productRouter)
    app.use("/api/carts", cartRouter)
    app.use("/", viewsControllerAsinc);
    app.use("/realTimeProducts", viewsControllerSinc)
};

module.exports = router;
