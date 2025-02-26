const express = require('express')
const router = express.Router()
const { getPrograms, getProgramsById, addOrUpdateProgram, deleteProgram } = require('../services/programDynamoService.js')


router.get('/', async(req, res) => {
    try {
        const programs = await getPrograms()
        res.status(200).json(programs)
    }
    catch(error) {
        res.status(500).send({
            message: `${error}`
        })
    }
})

router.get('/:id', async(req, res) => {
    const id = req.params.id

    try {
        const program = await getProgramsById(id)
        if(program) {
            res.status(200).json(program)
        }
        else {
            res.status(404).send({
                message: "Program not found"
            })
        }
    }
    catch(error) {
        res.status(500).send({
            message: `${error}`
        })
    }
})

router.post('/', async(req, res) => {
    const program = { ...req.body }

    try {
        const newProgram = await addOrUpdateProgram(program)
        res.status(201).send({
            newProgram
        })
    }
    catch(error) {
        res.status(500).send({
            message: `${error}`
        })
    }
})
    
router.put('/:id', async(req, res) => {
    const id = req.params.id
    const program = { ...req.body }
    program.pk = id
    program.sk = id

    try {
        const updatedProgram = await addOrUpdateProgram(program)
        if(updatedProgram) {
            res.status(200).json(updatedProgram)
        }
        else {
            res.status(404).send({
                message: "Program not found"
            })
        }
    }
    catch(error) {
        res.status(500).send({
            message: `${error}`
        })
    }
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id

    try {
        res.json(await deleteProgram(id))
    }
    catch(error) {
        res.status(500).send({
            message: `${error}`
        })
    }
})


module.exports = router