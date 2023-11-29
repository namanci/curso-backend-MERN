const express = require('express')
const { productsRouter } = require('./routes/products.route.js')
const { cartsRouter } = require('./routes/carts.route.js')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = 8080

app.use('/api/products/', productsRouter)
app.use('/api/carts/', cartsRouter)

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`)
})