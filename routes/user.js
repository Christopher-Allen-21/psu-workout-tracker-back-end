const express = require('express')
const router = express.Router()
const { getUsers, getUserById, addOrUpdateUser, deleteUser } = require('../services/userDynamoService.js')


router.get('/', async(req, res) => {
    try {
        const users = await getUsers()
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
        const user = await getUserById(id)
        if(user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).send({
                message: "User not found"
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
        const newUser = await addOrUpdateUser(user)
        res.status(201).send({
            newUser
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
        const updatedUser = await addOrUpdateUser(user)
        if(updatedUser) {
            res.status(200).json(updatedUser)
        }
        else {
            res.status(404).send({
                message: "User not found"
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
        res.json(await deleteUser(id))
    }
    catch(error) {
        res.status(500).send({
            message: `${error}`
        })
    }
})


module.exports = router