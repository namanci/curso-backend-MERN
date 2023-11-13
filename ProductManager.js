const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.path = path
        this.start()
    }

    // Verificamos si exite el archivo JSON, si no existe lo creamos.
    start() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]))
        }
    }

    // Recuperamos los productos del JSON.
    async getProducts() {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        return JSON.parse(data)
    }

    // Método para agregar un producto.
    async addProduct({ title, description, price, thumbnail, code, stock }) {
        const products = await this.getProducts()
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1 //id autoincrementable.

        //Comprobamos que ningún campo esté vacío.
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return console.error("Debe completar todos los campos.")
        }
        //Comprobamos que el código (code) no esté repetido.
        if (products.some(product => product.code === code)) {
            return console.error("El código ya existe.")
        }
        //Creamos el objeto incluyendo el id autoincrementable, lo "pusheamos" al array de productos y escribimos el JSON.
        const newProduct = { id, title, description, price, thumbnail, code, stock }
        products.push(newProduct)
        console.log(`El Producto "${newProduct.title}" fue agregado exitosamente.`)
        await fs.promises.writeFile(this.path, JSON.stringify(products))
    }

    // Método para buscar un producto por id.
    async getProductById(id) {
        const products = await this.getProducts()
        const product = products.find(product => product.id === id) // Mediante el método find buscamos el producto con el id ingresado.
        if (!product) return console.log("Producto no encontrado.")
        return product
    }

    // Método para actualizar un producto ingresando su id y un objeto con el campo o campos actualizados.
    async updateProduct(id, productUpdate) {
        const products = await this.getProducts()
        const productFind = products.findIndex(product => product.id === id) // Mediante el método findIndex buscamos el índice o posición del producto en el array.
        if (productFind === -1) return console.log('No se encuentra el producto.')
        products[productFind] = { ...products[productFind], ...productUpdate, id } // Actualizamos el producto con el índice obtenido y copiamos mediante spread operator los campos del producto original, luego las actualizaciones y por último el id para que el mismo nunca cambie (incluso si se incluye en productUpdate).
        await fs.promises.writeFile(this.path, JSON.stringify(products))
        console.log('Producto actualizado correctamente.')
    }

    // Método para borrar un producto por su id.
    async deleteProduct(id) {
        const products = await this.getProducts()
        if (!products.some(product => product.id === id)) return console.log('El producto que quiere borrar no existe.') // Mediante el método some comprobamos si el producto existe en el array.
        const productsFiltered = products.filter(product => product.id !== id) // Mediante el método filter creamos un array con todos los productos menos aquel con el id ingresado.
        await fs.promises.writeFile(this.path, JSON.stringify(productsFiltered))
        console.log('Producto eliminado.')
    }
}


// TESTING
async function test() {

    const instance = new ProductManager('./products.json')

    console.log(await instance.getProducts()) // []

    await instance.addProduct({
        title: "producto prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    }) // El Producto "producto prueba" fue agregado exitosamente.

    console.log('Producto recién agregado:', await instance.getProducts()) // Muestra el producto recién agregado.

    console.log('El producto con id 1 es:', await instance.getProductById(1)) // Muestra el producto con id = 1.

    console.log(await instance.getProductById(99)) // Producto no encontrado.

    await instance.updateProduct(
        1,
        {
            stock: 200
        }
    ) // Producto actualizado correctamente.

    await instance.deleteProduct(1) // Producto eliminado.

    await instance.deleteProduct(150) // El producto que quiere borrar no existe.
}

test() // Al finalizar la ejecución products.json quedará con un array vacío [].