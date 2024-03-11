const { Router } = require('express');
const TipoMultimedia = require('../models/TipoMultimedia');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [

    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty()

], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipoMultimedia = new TipoMultimedia();
        tipoMultimedia.nombre = req.body.nombre;
        tipoMultimedia.descripcion = req.body.descripcion;
        tipoMultimedia.fechaCreacion = new Date;
        tipoMultimedia.fechaActualizacion = new Date;


        tipoMultimedia = await tipoMultimedia.save();

        res.send(tipoMultimedia);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error aaaa');
    }
});

//Listar tipoMultimedia GET
router.get('/', async function (req, res) {
    try {
        const tipoMultimedia = await TipoMultimedia.find()

        res.send(tipoMultimedia);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

//Actualizar lista 
router.put('/:tipoMultimediaID', [

    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty()

], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }
        let tipoMultimedia = await TipoMultimedia.findById(req.params.tipoMultimediaID);
        if (!tipoMultimedia) {
            return res.status(400).send('tipoMultimedia no existe');
        }

        
        tipoMultimedia.nombre = req.body.nombre;
        tipoMultimedia.descripcion = req.body.descripcion;
        tipoMultimedia.fechaActualizacion = new Date;
        

        tipoMultimedia = await tipoMultimedia.save();

        res.send(tipoMultimedia);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error :( aqui ta');
    }
});

module.exports = router;