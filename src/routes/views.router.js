const { Router } = require('express')
//const ProductManager = require('../managers/ProductManager.js')
const ProductManager = require('../daos/ProductDaoAtlas.js')

const viewsRouter = Router()
const productManager = new ProductManager()
//const productManager = new ProductManager('./src/products.json')

//MONGO ATLAS
viewsRouter.get('/', async (req, res) => {
    const { page=1, limit=5 } = req.query
    const prodList = await productManager.getProducts({ page, limit })
    res.render('product', { title: 'Listado de Productos MDB-Atlas', name: 'Invitado', prodList })
})

//FILE SYSTEM
// viewsRouter.get('/', async (req, res) => {
//     const prodList = await productManager.getProducts()
//     res.render('home', { title: 'Listado de Productos', name: 'Usuario de Prueba', prodList })
// })

// viewsRouter.get('/realtimeproducts', async (req, res) => {
//     const prodList = await productManager.getProducts()
//     res.render('realTimeProducts', { title: 'Productos en Tiempo Real', name: 'Usuario de Prueba', prodList })
// })

module.exports = viewsRouter