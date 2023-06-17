const express = require('express')
const ProductManager = require("./ProductManager")

const app = express()
app.use(express.json())

const productManager = new ProductManager('../products.json');

app.get("/",async (req,res) => {
    try{
        const products = await productManager.getProducts();
        res.status(200).json(products)
    }catch(error){
        res.status(404).json({error: "Error al optener los productos"})
    }
})

app.get('/products', async (req,res) => {
    const { limit } = req.query;
    try{
        //leyendo el archivo
        const products = await productManager.getProducts();
        if (!limit){
            //se devuelve todos los productos
            res.status(200).json(products)
        }else{
            limite = parseInt(limit)
            const limitedProducts = products.slice(0, limit)
            res.json(limitedProducts)
        }
    }catch(error){
        res.status(404).json({error: "Error al optener los productos"})
    }
})

app.get('/products/:pid', async (req,res) => {
    let { pid } = req.params
    try{
        const product = await productManager.getProductById(Number(pid))
        res.json(product)
        
    }catch(error){
        res.json(error)
    }
})

//const fs = require('fs');


/*
fs.readFile('../products.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  try {
    const products = JSON.parse(data);
    console.log(products);
  } catch (error) {
    console.error('Error al analizar el archivo JSON:', error);
  }
});
*/

app.listen(8080, () => console.log('corriendo server...'))
