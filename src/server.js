const express = require('express')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const { connect } = require('mongoose')
const ProductManager = require('./managers/ProductManager')
const productsRouter = require('./routes/products.router.js')
const cartsRouter = require('./routes/carts.router.js')
const viewsRouter = require('./routes/views.router.js')
//const { connect } = require('http2')

const server = express()
const httpServer = require('http').Server(server)
const io = new Server(httpServer)

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(__dirname + '/public'))

const port = 8080
const productManager = new ProductManager('./src/products.json')

const connectDb = async () => {
    await connect('')
    console.log('Base de datos conectada.')
}
connectDb()

server.engine('hbs', handlebars.engine({ extname: '.hbs' }))
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')

server.use('/api/products/', productsRouter)
server.use('/api/carts/', cartsRouter)
server.use('/views', viewsRouter)

server.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Error del servidor')
})

// Conectamos Socket.io.
io.on('connection', (socket) => {
    console.log('Cliente conectado')

    // Evento para agregar nuevos productos.
    socket.on('addProduct', async (productData) => {
        try {
            await productManager.addProduct(productData)

            // Emitimos evento de actualización a todos los clientes conectados.
            const updatedProducts = await productManager.getProducts()
            io.emit('updateProducts', updatedProducts)
        } catch (error) {
            console.error(error)
        }
    })

    socket.on('deleteProduct', async (productId) => {
        try {
            await productManager.deleteProduct(productId)

            // Emitimos evento de actualización a todos los clientes conectados.
            const updatedProducts = await productManager.getProducts()
            io.emit('updateProducts', updatedProducts)
        } catch (error) {
            console.error(error)
        }
    })

    socket.on('disconnect', () => {
        console.log('Cliente desconectado')
    })
})

httpServer.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})
