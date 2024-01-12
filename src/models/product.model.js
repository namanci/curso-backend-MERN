const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

// Definimos el esquema para los productos
const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    code: { type: Number, required: true }
})

productSchema.plugin(mongoosePaginate)

// Creamos el modelo
const productModel = model('Product', productSchema)

module.exports = { productModel }