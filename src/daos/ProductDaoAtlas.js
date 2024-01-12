const { productModel } = require('../models/product.model.js')

// Creamos la clase que gestiona el CRUD de los productos
class ProductManager {
    // Método para agregar un nuevo producto
    addProduct = async (data) => {
        try {
            // Guardamos el producto en la base de datos
            const product = await productModel.create(data)
            // Devolvemos el producto creado
            return product
        } catch (error) {
            throw error
        }
    }

    // Método para leer todos los productos
    getProducts = async ({ page, limit, query='' }) => {
        try {
            // Buscamos todos los productos en la base de datos
            const products = await productModel.paginate({}, { limit, page, lean:true })
            // Devolvemos los productos
            return products
        } catch (error) {
            throw error
        }
    }

    // Método para leer un producto por su id
    getProductById = async (pid) => {
        try {
            // Buscamos el producto por su id en la base de datos
            const product = await productModel.findById({ _id: pid })
            // Devolvemos el producto encontrado
            return product
        } catch (error) {
            throw error
        }
    }

    // Método para actualizar un producto por su id
    updateProduct = async (pid, data) => {
        try {
            // Actualizamos el producto por su id en la base de datos con los datos recibidos
            const product = await productModel.updateOne({ _id: pid }, data, { new: true })
            // Devolvemos el producto actualizado
            return product
        } catch (error) {
            throw error
        }
    }

    // Método para eliminar un producto por su id
    deleteProduct = async (pid) => {
        try {
            // Eliminamos el producto por su id en la base de datos
            const product = await productModel.deleteOne({ _id: pid })
            // Devolvemos el producto eliminado
            return product
        } catch (error) {
            throw error
        }
    }
}

module.exports = ProductManager