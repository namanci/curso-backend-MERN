const { Router } = require('express')
const ProductManager = require('../managers/ProductManager.js')

const productsRouter = Router()
const productManager = new ProductManager('./src/products.json')

// Ruta para obtener todos los productos.
productsRouter.get('/', async (req, res) => {
    try {
        const limit = req.query.limit
        const products = await productManager.getProducts()

        if (limit) {
            const limitedProducts = products.slice(0, parseInt(limit, 10))
            res.status(200).json({ status: 'éxito', data: limitedProducts })
        } else {
            res.status(200).json({ status: 'éxito', data: products })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'error', error: 'Error interno del servidor.' })
    }
})

// Ruta para obtener un producto por ID.
productsRouter.get('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid, 10)
        const product = await productManager.getProductById(productId)

        if (product) {
            res.status(200).json({ status: 'éxito', data: product })
        } else {
            res.status(404).json({ status: 'error', error: 'Producto no encontrado.' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'error', error: 'Error interno del servidor.' })
    }
})

// Ruta para agregar un producto.
productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body

        await productManager.addProduct({ title, description, code, price, stock, category, thumbnails })

        res.status(200).json({ status: 'éxito', message: 'Producto agregado correctamente.' })
    } catch (error) {
        console.error(error)
        res.status(400).json({ status: 'error', error: 'Debe completar todos los campos obligatorios.' })
    }
})

// Ruta para actualizar un producto por ID.
productsRouter.put('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid, 10)
        const productUpdate = req.body

        await productManager.updateProduct(productId, productUpdate)

        res.status(200).json({ status: 'éxito', message: 'Producto actualizado correctamente.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'error', error: 'Error interno del servidor.' })
    }
})

// Ruta para eliminar un producto por ID.
productsRouter.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid, 10)

        await productManager.deleteProduct(productId)

        res.status(200).json({ status: 'éxito', message: 'Producto eliminado correctamente.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'error', error: 'Error interno del servidor.' })
    }
})

module.exports = productsRouter