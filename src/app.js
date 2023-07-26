const express = require('express')
const app = express();
const router = require("./router/router")
const handlebars = require("express-handlebars")
const { Server } = require('socket.io')

const ProductManager = require("./managers/products/ProductManager")
const productManager = new ProductManager();

const PORT = process.env.PORT || 8080;

const httpServer = app.listen(PORT, () => console.log("Listening..."))
const io = new Server(httpServer);

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/static", express.static("./src/public"));

app.engine("handlebars", handlebars.engine())
app.set("views", "./src/views")
app.set("view engine", "handlebars")

router(app);  

io.on("connection", (socket) => {
  console.log(`New user ${socket.id} joined`)

  //recibe desde el front
  socket.on("client:newProduct", async (data) =>{
    const {title, description, price, code, stock, category} = data;

    const thumbnail = Array.isArray(data.thumbnail)
      ? data.thumbnail
      : [data.thumbnail];

      if (!title || !description || !price || !code || !stock || !category) {
        console.log("All fields are required");
      }

      const postProducts = await productManager.addProduct(
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category
      );

    //envia desde el back
    const products = await productManager.getProducts();
    const listProducts = products.filter((product) => product.status === true);

    io.emit("server:list", listProducts)
  });

  //recibe del front
  socket.on("cliente:deleteProduct", async (data) =>{
    const id = data;
    const logicalDeleteProduct = await productManager.logicalDeleteProduct(id);

    //envia desde el back
    const products = await productManager.getProducts()
    const listProducts = products.filter((product) => product.status === true)

    io.emit("server:list", listProducts)
  })

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`)
  })
})

