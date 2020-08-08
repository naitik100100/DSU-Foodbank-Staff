const AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var tableName = "orders";
exports.handler = (event, context, callback) => {
    var params = {
        TableName: tableName,
        Key: {
            "id": event.id
        },
        UpdateExpression: "set orderstatus=:s",
        ExpressionAttributeValues: {
            ":s": event.orderStatus
        }
    };
    
    docClient.update(params, function (err, data) {
        callback(err, data);
    });
};