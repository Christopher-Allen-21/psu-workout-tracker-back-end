const AWS = require('aws-sdk')
require('dotenv').config()

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const PROGRAMS_TABLE = process.env.PROGRAMS_TABLE

const getPrograms = async() => {
    const params = {
        TableName: PROGRAMS_TABLE
    }
    return await dynamoClient.scan(params).promise()
}

const getProgramById = async(id) => {
    const params = {
        TableName:  PROGRAMS_TABLE,
        ExpressionAttributeValues: { ":programId": id },
        KeyConditionExpression: "pk = :programId"
    }
    return await dynamoClient.query(params).promise()
}

const addOrUpdateProgram = async(program) => {
    const params = {
        TableName:  PROGRAMS_TABLE,
        Item: program
    }
    return await dynamoClient.put(params).promise()
}

const deleteProgram = async(id) => {
    const params = {
        TableName:  PROGRAMS_TABLE,
        Key: {
            "pk": id,
            "sk": id,
        }
    }
    return await dynamoClient.delete(params).promise()
}

module.exports = {
    dynamoClient,
    getPrograms,
    getProgramById,
    addOrUpdateProgram,
    deleteProgram
}


