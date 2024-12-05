const mongoose = require('mongoose');

// Define the form schema
const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    studentId: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    batch: { type: String, required: true },
    cgpa: { type: Number, required: true },
    location: { type: String, required: true },
    resume: { type: String, required: true },  // File path for resume
    cv: { type: String, required: true }       // File path for CV
});

// Create the model from the schema
const Form = mongoose.model('Form', formSchema);

module.exports = Form; // Export the model so it can be used in other files



