const AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var tableName = "orders";
exports.handler = (event, context, callback) => {
    var response;
    if (event.orderid == null) {
        response = {
            orderPlaced: false
        }
        callback(null, response);
    }

    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var formatteddate = date.getDate() + "-" + month + "-" + date.getFullYear();

    var params = {
        TableName: tableName,
        Key: {
            "id": event.orderid
        }
    }
    let result = docClient.get(params).promise();
    result.then((res) => {
        console.log("RES:" + res);
        if (res.Item == null) {
            response = {
                orderPlaced: false
            }
            callback(null, response);
        }
        var order = res.Item.orderedDate.split("-");
        let month_diff = Number(month) - Number(order[1]);
        let day_diff = Number(day) - Number(order[0]);
        let year_diff = Number(year) - Number(order[2]);

        if (year_diff <= 0) {
            if (month_diff <= 0) {
                if (day_diff <= 7) {
                    response = {
                        orderPlaced: true
                    }
                    callback(null, response);
                } else {
                    response = {
                        orderPlaced: false
                    }
                    callback(null, response);
                }
            } else {
                response = {
                    orderPlaced: false
                }
                callback(null, response);
            }
        } else {
            response = {
                orderPlaced: false
            }
            callback(null, response);
        }

    }).catch((err) => {
        return err;
    })

};