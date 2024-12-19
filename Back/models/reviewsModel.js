const mongoose = require('mongoose')

const reviewsProductsSchema = new mongoose.Schema({
   comentario: {
      type: String,
      required: true
   },
   stars: {
      type: Number,
      required: true,
   },
   fecha: {
      type: String
   },
   producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true
   },
   userReview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
   }
})

const ProductosReview = mongoose.model('ProductosReview', reviewsProductsSchema)

module.exports = ProductosReview