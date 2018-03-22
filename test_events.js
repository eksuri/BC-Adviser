process.env['AWS_REGION'] = 'us-west-2'
const index = require('./index');
const events = require('./intents').events;

let context = {};
context.done = function () {
    console.log("Lambda Function Complete");
}
context.succeed= function () {
    console.log("Lambda Function Success");
}
context.fail = function () {
    console.log("Lambda Function Failure");
}

events.forEach((event) => {
    index.handler(event, context, function () {
        console.log("Done");
    });
})