const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  const { id } = event.pathParameters;
  const timestamp = new Date().toISOString();

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: { id },
    UpdateExpression: 'SET #text = :text, updatedAt = :updatedAt',
    ExpressionAttributeNames: {
      '#text': 'text'
    },
    ExpressionAttributeValues: {
      ':text': data.text,
      ':updatedAt': timestamp
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    const result = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ error: 'Could not update the message' }),
    };
  }
};
