process.env['AWS_REGION'] = 'us-west-2'

var fs = require('fs');
var index = require('../../index');

var event = JSON.parse(fs.readFileSync('_event.json', 'utf8').trim());

var context = {};
context.done = function () {
    console.log("Lambda Function Complete");
}
context.succeed= function () {
    console.log("Lambda Function Success");
}
context.fail = function () {
    console.log("Lambda Function Failure");
}

index.handler(event, context, function () {
    console.log("Done");
});