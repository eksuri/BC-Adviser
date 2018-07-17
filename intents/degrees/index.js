const Speech = require('ssml-builder');
const schema = require('./_schema.json');
const degreesList = require('./degreeslist.json');

exports.schema = schema;

const degrees = require('../../common/web/degrees.js');

exports.GetBellevueDegreesIntent = async function () {
    let speech = new Speech();

    const degree_type = this.event.request.intent.slots.program.value;

    // if (degrees.list.includes(degree_type)) {
    
        // const list_of_degrees = await degrees.getDegrees(degree_type);
        if (degree_type == "professional" || degree_type == "technical") 
        {
            speech
                .say("Professional & technical degrees include");
            
            degreesList.degrees.professional.forEach((d) => {
                speech.say(d)
                    .pause("1s");
            })
        }
        else if (degree_type == "bachelor" || degree_type == "bachelors") 
        {
            speech.say(degree_type)
                .say(" degrees include");
            
            degreesList.degrees.bachelors.forEach((d) => {
                speech.say(d)
                    .pause("1s");
            })
        }   
        else if (degree_type == "certificate" || degree_type == "certificates") 
        {
            speech.say(degree_type)
                .say(" degrees include");
            
            degreesList.degrees.certificate.forEach((d) => {
                speech.say(d)
                    .pause("1s");
            })
        }   

        else if (degree_type == "transfer") 
        {
            speech.say(degree_type)
                .say(" degrees include");
            
            degreesList.degrees.transfer.forEach((d) => {
                speech.say(d)
                    .pause("1s");
            })
        }   

        else if (degree_type == "non transfer") 
        {
            speech.say(degree_type)
                .say(" degrees include");
            
            degreesList.degrees.nontransfer.forEach((d) => {
                speech.say(d)
                    .pause("1s");
            })
        }   

        else if (degree_type == "associate" || degree_type == "associates") 
        {
            speech.say(degree_type)
                .say(" degrees include");
            
            degreesList.degrees.nontransfer.forEach((d) => {
                speech.say(d)
                    .pause("1s");
            })

            degreesList.degrees.transfer.forEach((d) => {
                speech.say(d)
                    .pause("1s");
            })
        }   
        else {
            speech.say("that is not available at this time");
        }

        
        // speech.say(degree_type)
        //       .say("degrees include");

        // list_of_degrees.forEach((d) => {
        //     speech.say(d)
        //           .pause("1s");
        // });
    // } else {
    //     speech.say("That is not available at this time");
    // }

    this.emit(':tell', speech.ssml(true));
}