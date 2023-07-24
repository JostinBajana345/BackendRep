const { response } = require('express');
const { Estudiante } = require('../models');


const getEstudiante = async (req, res = response) => {
    const { limite = '', desde = 0 } = req.query;
    const query = { status: true };

    const [sum, estudiante] = await Promise.all([
        Estudiante.countDocuments(query),
        Estudiante.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        sum,
        estudiante
    })
}

const getEstudiantes = async (req, res = response) => {
    const { id } = req.params
    const estudiante = await Estudiante.findById(id);
    res.json(estudiante);
}
const createEstudiantes = async (req, res = response) => {
    const { status, ...body } = req.body;

    const existCedula = await Estudiante.findOne(body)

    if (existCedula) {
        return res.status(400).json({
            msg: `El estudiante con la cédula ${existCedula.cedula} ya existe`
        });
    }
    const data = {
        ...body,
    }

    const estudiante = new Estudiante(data);

    const newEstudiante = await estudiante.save();
    res.status(201).json(newEstudiante);
}
const updateEstudiante = async (req, res = response) => {
    const { id } = req.params;
    const { status, ...data } = req.body;
    const inscripcioEstudiante = await Estudiante.findByIdAndUpdate(id, data, { new: true })
    res.json(inscripcioEstudiante);
}
const deleteEstudiante = async (req, res = response) => {
    const { id } = req.params;
    const deleteinscripcion = await Estudiante.findByIdAndUpdate(id, { status: false }, { new: true });
    res.json(deleteinscripcion);
}

module.exports = {
    getEstudiante,
    getEstudiantes,
    createEstudiantes,
    updateEstudiante,
    deleteEstudiante
}