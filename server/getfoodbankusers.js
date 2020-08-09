const AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var tableName = "foodbankusers";
exports.handler = (event, context, callback) => {
    var params = {
        TableName: tableName,
        Key: {
            "id": event.id,
            "password": event.password
        }
    };
    docClient.get(params, function (err, data) {
        callback(err, data);
    });
};