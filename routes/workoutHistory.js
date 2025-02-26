const express = require('express')
const router = express.Router()
const { getWorkoutHistorys, getWorkoutHistoryById, addOrUpdateWorkoutHistory, deleteWorkoutHistory } = require('../services/workoutHistoryDynamoService.js')


router.get('/', async(req, res) => {
    try {
        const users = await getWorkoutHistorys()
        res.status(200).json(users)
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
        const user = await getWorkoutHistoryById(id)
        if(user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).send({
                message: "Workout History not found"
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
    const user = { ...req.body }

    try {
        const newWorkoutHistory = await addOrUpdateWorkoutHistory(user)
        res.status(201).send({
            newWorkoutHistory
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
    const user = { ...req.body }
    user.pk = id
    user.sk = id

    try {
        const updatedWorkoutHistory = await addOrUpdateWorkoutHistory(user)
        if(updatedWorkoutHistory) {
            res.status(200).json(updatedWorkoutHistory)
        }
        else {
            res.status(404).send({
                message: "Workout History not found"
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
        res.json(await deleteWorkoutHistory(id))
    }
    catch(error) {
        res.status(500).send({
            message: `${error}`
        })
    }
})


module.exports = router