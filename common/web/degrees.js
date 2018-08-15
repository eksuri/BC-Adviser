const fetch = require('node-fetch');

exports.list= ["bachelors", "associates", "transfer", "non transfer", 
               "professional", "technical", "eastern Washington"];

exports.getDegrees = async (degree_type) => {
    switch (degree_type) {
        case "bachelors":
            return await getBachelorsDegrees();
        case "professional":
        case "technical":
            return await getProfTechDegrees();
        case "eastern Washington":
            return await getEasternDegrees();
        case "transfer":
            return await getTransferDegrees();
        case "non transfer":
            return await getNonTransferDegrees();
        case "associates":
        default:
            return await Promise.all([
                getTransferDegrees(),
                getNonTransferDegrees()]
            ).then((c) => {return c[0].concat(c[1])});
      }
}

getBachelorsDegrees = async () => {
    return ["Applied Accounting", "Computer Science", "Data Analytics", "Digital Marketing", "Health Promotion and Management", "Healthcare Informatics", "Healthcare Management and Leadership", "Information Systems and Technology", "Interior Design", "Molecular Biosciences", "Nursing", "Radiation and Imaging Sciences"]
}

getProfTechDegrees = async () => {
    return ["Robotics and AI", "Accounting", "Allied Health", "Business Management", "Business Technology", "Criminal Justice", "Diagnostic Ultrasound Technology", "Digital Marketing", "Digital Media Arts", "Early Childhood Education", "Information Systems", "Interior Studies", "Marketing Management", "Molecular Sciences Technician", "Network Services and Computing Systems", "Neurodiagnostic Technology", "Nuclear Medicine Technlogy", "Radiation Therapy", "Radiologic Technology"]
}

getEasternDegrees = async () => {
    return ["Business Administration", "Children's Studies", "Interdisciplinary STudies", "Psychology"]   
}

getTransferDegrees = async () => {
    return ["Direct Transfer Aggrement", "Business", "Math Education", "Biology", "Engineering", "Music"]
}

getNonTransferDegrees = async () => {
    return ["General Studies", "Occupational and Life Skills"]
}