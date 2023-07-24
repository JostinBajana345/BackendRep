const { Router } = require('express')
const { check } =  require('express-validator')

const { getEstudiante,
        getEstudiantes,
        createEstudiantes,
        updateEstudiante,
        deleteEstudiante } = require('../controllers').Estudiante;

const { validateFields } = require('../middlewares');

const router = Router();

///     https://localhost:3000/Estudiantes/

router.get('/', getEstudiante);

router.get('/:id', [ 
    check('id', 'Este no es un ID de Mongo correcto').isMongoId() 
 ], getEstudiantes);

router.post('/',[
    check('cedula', 'la cedula es requerido').not().isEmpty(),
    validateFields
] , createEstudiantes)

router.put('/:id', updateEstudiante)

router.delete('/:id',[
    check('id','Debe ser un id de mongo VALIDO').isMongoId()
], deleteEstudiante)

module.exports = router;