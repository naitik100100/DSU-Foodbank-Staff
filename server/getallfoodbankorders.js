const AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var tableName = "orders";
exports.handler = (event, context, callback) => {
    var params = {
        TableName: tableName
    };
    docClient.scan(params, function (err, data) {
        callback(err, data);
    });
};