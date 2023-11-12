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
        const productsString = JSON.stringify(products)
        await fs.promises.writeFile(this.path, productsString)
    }

    async getProductById(id) {
        const products = await this.getProducts()
        const product = products.find(product => product.id === id)
        if (!product) { return console.log("Producto no encontrado.") }
        return product
    }


}

// TESTING
async function test() {

    const instance = new ProductManager('./products.json')

    console.log(await instance.getProducts()) // []

    await instance.addProduct({
        title: "Producto Prueba 1",
        description: "Este es un producto de prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc456",
        stock: 25
    }) // El Producto "Producto Prueba 1" fue agregado exitosamente.

    console.log(await instance.getProducts()) // Muestra el producto recién agregado.

    console.log(await instance.getProductById(1)) // Muestra el producto con id = 1.

}

test()