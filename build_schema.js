const schemas = require('./intents').schemas;
const fs = require('fs')

// documentet: https://developer.amazon.com/docs/smapi/interaction-model-schema.html

//require('_schema.json') is not async

const subjects = require('./common/ctc/subjects.js');

common_schemas = async () => {
    const data = await subjects.getAllSubjects();

    const name = "LIST_OF_SUBJECTS";
    const values = data.Subjects.map((s)=> {
        let v = {};
            v.id = "";
            v.name = {};
            v.name.value = s.Slug;
            v.name.synonyms = [s.Title];
            return v;
    })
    
    let common = {};
        common.name = name;
        common.values = values;
    return common;
}

main = async () => {
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
    
    types.push(await common_schemas());
    
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
}

main();
