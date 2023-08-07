const productRouter = require("./routerFile/product.router.js");
const cartRouter = require("./routerFile/cart.router.js");
const viewsControllerAsinc = require("./routerViews/productView/controller.views.js");
const viewsControllerSinc = require("./routerViews/productView/controller.viewsSinc.js");
const productsRouterMDB = require("./routerMDB/router.products.js")
const cartRouterMDB = require("./routerMDB/router.carts.js")
const chatRouter = require("./routerMDB/router.chat.js");
const viewsControllerCart = require("./routerViews/cartView/controller.views.js")


const router = (app) =>{
    app.use("/api/mongo/products", productsRouterMDB)
    app.use("/api/products", productRouter)
    app.use("/api/carts", cartRouter)
    app.use("/api/mongo/carts", cartRouterMDB)
    
    app.use("/", viewsControllerAsinc);
    app.use("/realTimeProducts", viewsControllerSinc)
    app.use("/chat", chatRouter)
    app.use("/cart", viewsControllerCart)
};

module.exports = router;