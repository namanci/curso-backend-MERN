const { Router } = require('express')
const ProductManager = require('../managers/ProductManager.js')

const viewsRouter = Router()
const productManager = new ProductManager('./src/products.json')

viewsRouter.get('/', async (req, res) => {
    const prodList = await productManager.getProducts()
    res.render('home', { title: 'Listado de Productos', name: 'Usuario de Prueba', prodList })
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
    const prodList = await productManager.getProducts()
    res.render('realTimeProducts', { title: 'Productos en Tiempo Real', name: 'Usuario de Prueba', prodList })
})

module.exports = viewsRouter