const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  const timestamp = new Date().toISOString();
  
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuidv4(),
      username: data.username || 'Anonym', // Använd 'Anonym' om inget användarnamn anges
      text: data.text,
      createdAt: timestamp,
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(params.Item),
    };
  } catch (error) {
    console.error('Error creating message:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ error: 'Could not create the message' }),
    };
  }
};