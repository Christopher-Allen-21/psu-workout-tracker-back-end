const express = require('express')
const router = express.Router()
const { getExercises, getExerciseById, addOrUpdateExercise, deleteExercise } = require('../services/exerciseDynamoService.js')


router.get('/', async(req, res) => {
    try {
        const exercises = await getExercises()
        res.status(200).json(exercises)
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
        const exercise = await getExerciseById(id)
        if(exercise) {
            res.status(200).json(exercise)
        }
        else {
            res.status(404).send({
                message: "Exercise not found"
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
    const exercise = { ...req.body }

    try {
        const newExercise = await addOrUpdateExercise(exercise)
        res.status(201).send({
            newExercise
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
    const exercise = { ...req.body }
    exercise.pk = id
    exercise.sk = id

    try {
        const updatedExercise = await addOrUpdateExercise(exercise)
        if(updatedExercise) {
            res.status(200).json(updatedExercise)
        }
        else {
            res.status(404).send({
                message: "Exercise not found"
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
        res.json(await deleteExercise(id))
    }
    catch(error) {
        res.status(500).send({
            message: `${error}`
        })
    }
})


module.exports = router