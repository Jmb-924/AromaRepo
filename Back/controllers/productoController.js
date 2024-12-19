// Aquí puedes escribir tu lógica de controladores... 
const Producto = require('../models/productoModel');
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage }).array('imgs', 9)

async function crearProducto(req, res) {
    upload(req, res, async (err) => {
        if (err) {
            return res.json({ mensaje: `Error al subir las imágenes: ${err}`, status: 500, type: 'Error:', });
        }
        try {
            // console.log('Request body:', req.body)
            // let bags = req.body.bags
            // if (typeof bags === 'string') {
            //     bags = JSON.parse(bags)
            // }
            const { marca, variedad, bags, proceso, perfil, origen, altura, productor, descripcion, userCoffee } = req.body;
            const imgs = req.files.map(file => ({
                data: file.buffer,
                contentType: file.mimetype
            }))



            const nuevoProducto = new Producto({
                marca,
                imgs,
                variedad,
                bags: [...bags],
                proceso,
                perfil,
                origen,
                altura,
                productor,
                descripcion,
                recommended: false,
                userCoffee
            });
            await nuevoProducto.save()
            return res.json({ mensaje: 'Producto creado exitosamente', status: 201, type: 'Success:', dataRes: nuevoProducto, });
        } catch (error) {
            return res.json({ mensaje: `Error al crear producto: ${error}`, status: 500, type: 'Error:', });
        }
    })
}

async function obtenerProductos(req, res) {
    try {
        const productos = await Producto.find().populate('userCoffee');

        const productosConImages = productos.map(producto => {
            const imgs = producto.imgs.map(img => {
                return {
                    data: img.data.toString('base64'),
                    contentType: img.contentType
                }
            })
            return {
                ...producto.toObject(),
                imgs
            }
        })
        return res.json(productosConImages);
    } catch (error) {
        console.log(error);
        return res.json({ mensaje: 'Error al obtener los productos', status: 500, type: 'Error:', });
    }
}

async function obtenerProducto(req, res) {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id).populate('userCoffee');
        if (!producto) {
            return res.json({ mensaje: 'Producto no encontrado', status: 404, type: 'Error:', });
        }

        const productoConImages = await producto.imgs.map(img => {
            return {
                data: img.data.toString('base64'),
                contentType: img.contentType
            }
        })
        if (productoConImages) {
            producto.imgs = productoConImages
            return res.json(producto);
        }
        return res.json({ mensaje: "Sin Imagenes Cargadas", status: 501, type: 'Error:', dataRes: producto })
    } catch (error) {
        console.log(error);
        return res.json({ mensaje: 'Error al obtener el producto', status: 500, type: 'Error:', });
    }
}

async function obtenerProductoByUser(req, res) {
    try {
        const productos = await Producto.find({ userCoffee: req.params.id }).populate('userCoffee');

        const productosConImages = productos.map(producto => {
            const imgs = producto.imgs.map(img => {
                return {
                    data: img.data.toString('base64'),
                    contentType: img.contentType
                }
            })
            return {
                ...producto.toObject(),
                imgs
            }
        })
        return res.json(productosConImages);
    } catch (error) {
        onsole.log(error);
        return res.json({ mensaje: 'Error al obtener los productos', status: 500, type: 'Error:', });
    }
}


async function actualizarProducto(req, res) {
    try {
        const { id } = req.params
        const { marca, variedad, bags, proceso, perfil, origen, altura, productor, descripcion, recommended } = req.body;

        const updateData = {
            marca,
            variedad,
            bags,
            proceso,
            perfil,
            origen,
            altura,
            productor,
            descripcion,
            recommended,
        }

        const d = await Producto.findByIdAndUpdate(id, req.body, { new: false, runValidators: true })
        return res.json({ mensaje: 'Producto actualizado exitosamente', status: 201, type: 'Success:', dataRes: d });
    } catch (error) {
        console.log(error)
        return res.json({ mensaje: 'Error al actualizar producto', status: 500, type: 'Error:', err: error });
    }
}

async function actualizarImgProducto(req, res) {

}

async function eliminarProducto(req, res) {
    try {
        const { id } = req.params;
        await Producto.findByIdAndDelete(id);
        return res.json({ mensaje: 'Producto eliminado Correctamente', status: 200, type: 'Success:', });
    } catch (error) {
        console.log(error);
        return res.json({ mensaje: 'Error al eliminar el producto', status: 500, type: 'Error:', });
    }
}

module.exports = { crearProducto, obtenerProductos, obtenerProducto, obtenerProductoByUser, actualizarProducto, actualizarImgProducto, eliminarProducto };
