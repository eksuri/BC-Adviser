const schemas = require('./intents').schemas;
const fs = require('fs')

// documentet: https://developer.amazon.com/docs/smapi/interaction-model-schema.html

//require('_schema.json') is not async

const subjects = require('./common/ctc/subjects.js');

common_subjects = async () => {
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

common_quarters = async () => {
    const name = "LIST_OF_QUARTERS";
    const quarters = [["Fall", "Autumn"],
                      ["Summer"],
                      ["Spring"],
                      ["Winter"]]
    const values = quarters.map((s)=> {
        let v = {};
            v.id = "";
            v.name = {};
            v.name.value = s.shift();
            if(s.length > 0) {
                v.name.synonyms = [];
                s.forEach((synonym)=> {
                    v.name.synonyms.push(synonym);
                })
            }
            return v;
    })
    
    let common = {};
        common.name = name;
        common.values = values;
    return common;
}

main = async () => {
    let intents = []
    let types = []
    let dialogs = []
    let prompts = []
    
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
        if (schema.dialogs) {
            schema.dialogs.forEach((dialog) => {
                dialogs.push(dialog)
            })
        }
        if (schema.prompts) {
            schema.prompts.forEach((prompt) => {
                prompts.push(prompt)
            })
        }
    })
    
    types.push(await common_subjects());
    types.push(await common_quarters());

    let schema = {
        "interactionModel": {
            "languageModel": {
                "invocationName": "bc adviser",
                "intents": intents,
                "types": types,
            },
            "dialog": {
                "intents": dialogs
            },
            "prompts": prompts
        }
    }
    
    fs.writeFile('./schema.json', JSON.stringify(schema, null, 4), 'utf-8', function(err) {
        if (err) throw err
    })
}

main();
