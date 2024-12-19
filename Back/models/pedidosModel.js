const mongoose = require('mongoose')

const pedidosSchema = new mongoose.Schema({
   productos: [{
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Producto',
         required: true
      },
      idBag: {
         type: Number,
      },
      idMol: {
         type: Number,
      },
      cant: {
         type: Number,
         required: true
      },
      total: {
         type: Number,
      },
      precio: {
         type: Number,
      },
   }],
   totalPedido: {
      type: Number,
      required: true
   },
   // [0=rechazado, 1=enviado, 2=en_proceso, 3=finalizado]
   state: {
      type: Number,
      required: true,
      default: 1
   },
   userPedido: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
   }
})

const Pedido = mongoose.model('PedidoUser', pedidosSchema)

module.exports = Pedido