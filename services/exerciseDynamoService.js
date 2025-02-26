const AWS = require('aws-sdk')
require('dotenv').config()

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const EXERCISES_TABLE = process.env.EXERCISES_TABLE

const getExercises = async() => {
    const params = {
        TableName: EXERCISES_TABLE
    }
    return await dynamoClient.scan(params).promise()
}

const getExerciseById = async(id) => {
    const params = {
        TableName:  EXERCISES_TABLE,
        ExpressionAttributeValues: { ":exerciseId": id },
        KeyConditionExpression: "pk = :exerciseId"
    }
    return await dynamoClient.query(params).promise()
}

const addOrUpdateExercise = async(exercise) => {
    const params = {
        TableName:  EXERCISES_TABLE,
        Item: exercise
    }
    return await dynamoClient.put(params).promise()
}

const deleteExercise = async(id) => {
    const params = {
        TableName:  EXERCISES_TABLE,
        Key: {
            "pk": id,
            "sk": id,
        }
    }
    return await dynamoClient.delete(params).promise()
}

module.exports = {
    dynamoClient,
    getExercises,
    getExerciseById,
    addOrUpdateExercise,
    deleteExercise
}




