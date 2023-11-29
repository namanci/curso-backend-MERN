const fs = require('node:fs')

class CartsManager {
    constructor(cartPath) {
        this.cartPath = cartPath
        this.start()
    }

    // Verificamos si exite el archivo JSON, si no existe lo creamos.
    async start() {
        if (!fs.existsSync(this.cartPath)) {
            await this.writeCarts([])
        }
    }

    // Método para escribir el archivo JSON.
    async writeCarts(carts) {
        await fs.promises.writeFile(this.cartPath, JSON.stringify(carts, null, 2))
    }

    // Método para obtener los carritos.
    async getCarts() {
        const data = await fs.promises.readFile(this.cartPath, 'utf-8')
        return JSON.parse(data)
    }

    // Método para obtener un carrito por ID.
    async getCartById(cartId) {
        const carts = await this.getCarts()
        return carts.find(cart => cart.id === cartId)
    }

    // Método para crear un carrito.
    async createCart() {
        const carts = await this.getCarts()
        const newCart = { id: this.generateId(), products: [] }
        carts.push(newCart)
        await this.writeCarts(carts)
        return newCart
    }

    // Método para agregar un producto a un carrito.
    async addToCart(cartId, productId, quantity = 1) {
        const carts = await this.getCarts()
        const cartIndex = carts.findIndex(cart => cart.id === cartId)

        if (cartIndex === -1) {
            throw new Error('No se encuentra el Carrito.')
        }

        const existingProductIndex = carts[cartIndex].products.findIndex(p => p.product.id === productId)

        if (existingProductIndex !== -1) {
            // Si el producto existe actualizamos la cantidad.
            carts[cartIndex].products[existingProductIndex].quantity += quantity
        } else {
            // Si no existe agregamos el producto al carrito.
            carts[cartIndex].products.push({ productId, quantity })
        }

        await this.writeCarts(carts)
        return carts[cartIndex]
    }

    // Generamos un Id aleatorio para el carrito.
    generateId() {
        return Math.random().toString(36).substring(7)
    }
}

module.exports = CartsManager