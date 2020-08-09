const AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();


exports.handler = (event, context, callback) => {
    console.log(event);
    var tableName = "orders";
    var params = {
        TableName: tableName,
        Key: {
            "id": event.id
        }
    };

    docClient.delete(params, function (err, data) {
        console.log(event);
        callback(err, data);
    });
};