const { model, Schema } = require('mongoose');

const EstudianteSchema = Schema(
    {

        nombres: { type: String, required: true },
        apellidos: { type: String, required: true },
        cedula: { type: Number, required: true, unique: true },
        email: { type: String, required: true },
        telefono: { type: Number, required: true },
        direccion: { type: String, required: true },
        fechaNacimiento: { type: String, required: true },
        genero: { type: String, required: true },
        nivelAcademico: { type: String, required: true },
        paralelo: { type: String, required: true },
        periodo: { type: String, required: true },
        nombreRepresentante: { type: String, required: true },
        apellidoRepresentante: { type: String, required: true },
        cedulaRepresentante: { type: Number, required: true },
        telefonoRepresentante: { type: Number, required: true },
        direccionRepresentante: { type: String, required: true },
        emailRepresentante: { type: String, required: true },
        status: { type: Boolean, default: true },
    }
);

EstudianteSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    return data;
}

module.exports = model('Estudiante', EstudianteSchema);