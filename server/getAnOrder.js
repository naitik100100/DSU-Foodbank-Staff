const AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var tableName = "orders";
exports.handler = (event, context, callback) => {
    var params = {
        TableName: tableName,
        Key: {
            "id": event.id
        }
    };

    console.log(params.key)
    docClient.get(params, function (err, data) {
        callback(err, data);
    });
};