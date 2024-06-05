const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")

const { Schema } = mongoose

const studentsSubjectsSchema = new Schema ({

    user_id: {
        type: ObjectId,
        required:true
    }, 
    subject_id: {
        type: ObjectId,
        required:true
    },
    subject_name: {
        type:"string"
    }
});

const studentsSubjects = mongoose.model("studentsSubjects", studentsSubjectsSchema);

module.exports = {
    studentsSubjects,
    studentsSubjectsSchema,
}