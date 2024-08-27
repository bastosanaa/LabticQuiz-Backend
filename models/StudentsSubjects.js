const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")

const { Schema } = mongoose

const studentsSubjectsSchema = new Schema ({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required:true,
        default: null
    }, 
    subject_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
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