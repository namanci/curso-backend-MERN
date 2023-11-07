class ProductManager {
    constructor() {
        this.products = []
        this.counterId = 1
    }
    //Método para agregar un producto.
    addProduct({ title, description, price, thumbnail, code, stock }) {
        //Comprobamos que ningún campo esté vacío.
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Debe completar todos los campos.")
            return
        }
        //Comprobamos que el código (code) no esté repetido.
        if (this.products.some(product => product.code === code)) {
            console.error("El código ya existe.")
            return
        }
        //Creamos el objeto incluyendo un id autoincrementable y lo "pusheamos" al array de productos.
        const newProduct = {
            id: this.counterId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.products.push(newProduct)
        console.log(`El Producto "${newProduct.title}" fue agregado exitosamente.`)
    }
    //Método para obtener el array de productos.
    getProducts() {
        return this.products
    }
    //Método para buscar un producto por id.
    getProductById(id) {
        const product = this.products.find(product => product.id === id)
        if (product) {
            return product
        } else {
            console.log("Producto no encontrado.")
        }
    }
}

// TESTING
// Iniciamos una instancia de la clase ProductManager.
const instance = new ProductManager()

// 1 - Obtener un arreglo vacío.
console.log(instance.getProducts()) // []

// 2 - Agregar un producto de prueba.
instance.addProduct({
    title: "Producto Prueba",
    description: "Este es un producto de prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
})
console.log(instance.getProducts()) // El Producto "Producto Prueba" fue agregado exitosamente.

// 3 - Agregar un producto con código repetido.
instance.addProduct({
    title: "Producto Prueba",
    description: "Este es un producto de prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
}) // El código ya existe.

// 4 - Obtener un producto por id.
const product = instance.getProductById(1)
console.log(product) // Muestra el producto con id: 1.

// 5 - Obtener un producto por id no existente.
instance.getProductById(99) // Producto no encontrado.