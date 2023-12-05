const { Router } = require('express')
const ProductManager = require('../managers/ProductManager.js')

const viewsRouter = Router()
const productManager = new ProductManager('./src/products.json')

viewsRouter.get('/', async (req, res) => {
    const prodList = await productManager.getProducts()
    res.render('home', { title: 'Listado de Productos', name: 'Usuario de Prueba', prodList })
})

module.exports = viewsRouter