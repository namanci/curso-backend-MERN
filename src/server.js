const express = require('express')
const handlebars = require('express-handlebars')
const productsRouter = require('./routes/products.router.js')
const cartsRouter = require('./routes/carts.router.js')
const viewsRouter = require('./routes/views.router.js')

const server = express()
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(__dirname+'/public'))
const port = 8080

server.engine('hbs', handlebars.engine({ extname: '.hbs' }))
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')

server.use('/api/products/', productsRouter)
server.use('/api/carts/', cartsRouter)
server.use('/views', viewsRouter)
server.use(( err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('Error del servidor')
})

server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})