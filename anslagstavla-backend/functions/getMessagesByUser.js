const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const { username } = event.pathParameters;

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    FilterExpression: '#username = :username',
    ExpressionAttributeNames: {
      '#username': 'username',
    },
    ExpressionAttributeValues: {
      ':username': username,
    },
  };

  try {
    const result = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ error: 'Could not fetch the messages for this user' }),
    };
  }
};
