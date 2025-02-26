const AWS = require('aws-sdk')
require('dotenv').config()

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const WORKOUT_HISTORY_TABLE = process.env.WORKOUT_HISTORY_TABLE

const getWorkoutHistorys = async() => {
    const params = {
        TableName: WORKOUT_HISTORY_TABLE
    }
    return await dynamoClient.scan(params).promise()
}

const getWorkoutHistoryById = async(id) => {
    const params = {
        TableName:  WORKOUT_HISTORY_TABLE,
        ExpressionAttributeValues: { ":workoutHistoryId": id },
        KeyConditionExpression: "pk = :workoutHistoryId"
    }
    return await dynamoClient.query(params).promise()
}

const addOrUpdateWorkoutHistory = async(workoutHistory) => {
    const params = {
        TableName:  WORKOUT_HISTORY_TABLE,
        Item: workoutHistory
    }
    return await dynamoClient.put(params).promise()
}

const deleteWorkoutHistory = async(id) => {
    const params = {
        TableName:  WORKOUT_HISTORY_TABLE,
        Key: {
            "pk": id,
            "sk": id,
        }
    }
    return await dynamoClient.delete(params).promise()
}

module.exports = {
    dynamoClient,
    getWorkoutHistorys,
    getWorkoutHistoryById,
    addOrUpdateWorkoutHistory,
    deleteWorkoutHistory
}