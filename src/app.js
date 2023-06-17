const express = require('express')
const ProductManager = require("./ProductManager")

const app = express()
const productManager = new ProductManager("./Json/products.json");

app.get('/products', async (req,res) => {
    const {limite} = req.query
    try{
        //leyendo el archivo
        const products = await productManager.getProduct()
        if (!limite){
            //se devuelve todos los productos
            res.json(products)
        }else{
            limite = parseInt(limite)
            const limitedProducts = products.slice(0, limite)
            res.json(limitedProducts)
        }
    }catch(error){
        res.json(error)
    }
})

app.get('/product/:pid', async (req,res) => {
    let { pid } = req.params
    try{
        const product = await productManager.getProductById(Number(pid))
        res.json(product)
        
    }catch(error){
        res.json(error)
    }
})

app.listen(8080, () => console.log('corriendo server...'))