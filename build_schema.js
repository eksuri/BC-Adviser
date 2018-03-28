const schemas = require('./intents').schemas;
var fs = require('fs')


// documentet: https://developer.amazon.com/docs/smapi/interaction-model-schema.html

//require('_schema.json') is not async 

let base = {
    "languageModel": {
        "invocationName": "bc adviser",
        "intents": [],
        "types": [],
    }
}

let intents = []
let types = []

schemas.forEach((schema) => {
    if (schema.intents) {
        schema.intents.forEach((intent) => {
            intents.push(intent)
        })
    }
    if (schema.types) {
        schema.types.forEach((type) => {
            types.push(type)
        })
    }
})


let schema = {
    "languageModel": {
        "invocationName": "bc adviser",
        "intents": intents,
        "types": types,
    }
}

fs.writeFile('./schema.json', JSON.stringify(schema, null, 4), 'utf-8', function(err) {
	if (err) throw err
})
