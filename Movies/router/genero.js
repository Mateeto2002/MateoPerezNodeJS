const { Router } = require('express');
const Genero = require('../models/Genero');
const { validationResult, check } = require('express-validator');

const router = Router();

//Crear genero POST
router.post('/', [

    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('descripcion', 'invalid.descripcion').not().isEmpty()
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let genero = new Genero();
        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.fechaCreacion = new Date;
        genero.fechaActualizacion = new Date;
        genero.descripcion = req.body.descripcion;

        genero = await genero.save();

        res.send(genero);

    } catch (error) {
        console.log(error);
    }
});

//Listar generos GET
router.get('/', async function (req, res) {
    try {
        const genero = await Genero.find();

        res.send(genero);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});
//Actualizar Generos PUT
router.put('/:generoID', [

    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('descripcion', 'invalid.descripcion').not().isEmpty()


], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let genero = await Genero.findById(req.params.generoID);
        if (!genero) {
            return res.status(400).send('Genero no existe');
        }

        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.fechaActualizacion = new Date;
        genero.descripcion = req.body.descripcion;

        genero = await genero.save();

        res.send(genero);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error :(');
    }
});





module.exports = router;