const express = require('express')
const ProductManager = require('./ProductManager')

const app = express()
app.use(express.urlencoded({ extended: true }))
const port = 8080
const productManager = new ProductManager('./products.json')

// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit
        const products = await productManager.getProducts()

        if (limit) {
            const limitedProducts = products.slice(0, parseInt(limit, 10))
            res.json({ products: limitedProducts })
        } else {
            res.json({ products })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del Servidor.' })
    }
})

// Endpoint para obtener un producto por ID
app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid, 10)
        const product = await productManager.getProductById(productId)

        if (product) {
            res.json({ product })
        } else {
            res.status(404).json({ error: 'Producto no encontrado.' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del Servidor.' })
    }
})

// Iniciamos el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`)
})