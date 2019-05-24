const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.run = async () => {
    const params = {
        TableName: 'products'
    };

    let error = null;
    const result = await dynamoDb.scan(params, function (err, data) {
        if (err) {
            console.log("Error", err);
            error = err;
        } else {
            console.log("Success", data.Items);
        }
    }).promise();

    console.log(result);
    if (error) {
        const errorResponse = {
            statusCode: 500,
            body: JSON.stringify({
                errorMessage: error
            })
        };
        return Promise.resolve(errorResponse);
    }
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            result
        })
    };
    return Promise.resolve(response);
};
