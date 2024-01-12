const { Router } = require('express')
const ProductManager = require('../daos/ProductDaoAtlas.js')

const productsRouter = Router()
const productManager = new ProductManager()

// Ruta para obtener todos los productos.
productsRouter.get('/', async (req, res) => {
    try {
        const { page=1, limit=3 } = req.query
        const { docs, 
            hasPrevPage,
            prevPage,
            hasNextPage,
            nextPage
        } = await productManager.getProducts({ page, limit })
        if (!docs) {
            return res.status(400).send('No encontrado')
        }
        res.status(200).render('product', {
            products: docs, 
            hasPrevPage,
            prevPage,
            hasNextPage,
            nextPage, 
        })
    } catch (error) {
        console.log(error)
    }
})

// Ruta para obtener un producto por ID.
productsRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params
    let productById = await productManager.getProductById(pid)
    res.send(productById)
})

// Ruta para agregar un producto.
productsRouter.post('/', async (req, res) => {
    try {
        let { title, thumbnail, price, code, stock } = req.body
        if (!title || !thumbnail || !price || !code || !stock) {
            return res.status(400).send({ message: 'Debe completar todos los campos obligatorios.' })
        }
        let addedProduct = await productManager.addProduct({ title, description, thumbnail, price, code, stock })
        res.status(201).send({ 
            addedProduct,
            message: 'Producto agregado correctamente.' 
        })
    } catch (error) {
        console.log(error)
    }
})

// Ruta para actualizar un producto por ID.
productsRouter.put('/:pid', async (req, res) =>{
    const { pid } = req.params
    let productUpdate = req.body
    if (!productUpdate.title || !productUpdate.thumbnail || !productUpdate.price || !productUpdate.code || !productUpdate.stock) {
        return res.status(400).send({ message: 'Debe completar todos los campos obligatorios.' })
    }
    let result = await productManager.updateProduct(pid, productUpdate)
    res.status(201).send({ 
        products: result,
        message: 'Producto actualizado correctamente.'
    })
})

// Ruta para eliminar un producto por ID.
productsRouter.delete('/:pid', async (req, res)=> {
    const { pid } = req.params
    let result = await productManager.deleteProduct(pid)
    res.status(200).send({ message:'Producto eliminado correctamente.', result })
})

module.exports = productsRouter