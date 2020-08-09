const AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var tableName = "orders";
exports.handler = (event, context, callback) => {
    var params = {
        TableName: tableName,
        Item: {
            "id": event.id,
            "bannerId": event.bannerId,
            "deliveredDate": event.deliveredDate,
            "orderedDate": event.orderedDate,
            "pickUpDate": event.pickUpDate,
            "status": event.orderstatus,
            "details": event.details
        }
    };
    docClient.put(params, function (err, data) {
        callback(err, data);
    });
};