const AWS = require('aws-sdk')
require('dotenv').config()

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const USER_TABLE = "psu-workout-tracker-users"

const getUsers = async() => {
    const params = {
        TableName: USER_TABLE
    }
    return await dynamoClient.scan(params).promise()
}

const getUserById = async(id) => {
    const params = {
        TableName:  USER_TABLE,
        ExpressionAttributeValues: { ":userId": id },
        KeyConditionExpression: "pk = :userId"
    }
    return await dynamoClient.query(params).promise()
}

const addOrUpdateUser = async(user) => {
    const params = {
        TableName:  USER_TABLE,
        Item: user
    }
    return await dynamoClient.put(params).promise()
}

const deleteUser = async(id) => {
    const params = {
        TableName:  USER_TABLE,
        Key: {
            "pk": id,
            "sk": id,
        }
    }
    return await dynamoClient.delete(params).promise()
}

module.exports = {
    dynamoClient,
    getUsers,
    getUserById,
    addOrUpdateUser,
    deleteUser
}

// const user = {
//     "pk": "1",
//     "sk": "1",
//     "firstName": "Robert",
//     "lastName": "Allen",
//     "birthDate": "05/22/1998",
//     "email": "sallen@yahoo.com",
//     "height": 68,
//     "weight": 170
// }


