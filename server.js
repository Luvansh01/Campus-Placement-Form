const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const Form = require('./models/form');  // Import the Form model

const app = express();
const PORT = 3000;

// MongoDB connection URI
const dbURI = "mongodb://localhost:27017/placementForm";  // Or use MongoDB Atlas URL if you have a remote DB

// Connect to MongoDB
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB!");
})
.catch((err) => {
    console.log("MongoDB connection error:", err);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Folder where uploaded files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Unique filename using current timestamp
    }
});

const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Handle form submission and file upload
app.post('/submit', upload.fields([{ name: 'resume' }, { name: 'cv' }]), async (req, res) => {
    try {
        // Extract form data and file paths
        const formData = req.body;
        const uploadedFiles = req.files;

        // Create a new form entry to save in the database
        const newForm = new Form({
            name: formData.name,
            studentId: formData.studentId,
            email: formData.email,
            phone: formData.phone,
            department: formData.department,
            batch: formData.batch,
            cgpa: formData.cgpa,
            location: formData.location,
            resume: uploadedFiles.resume[0].path,  // Path of the uploaded resume file
            cv: uploadedFiles.cv[0].path         // Path of the uploaded CV file
        });

        // Save the form data in the MongoDB database
        await newForm.save();
        
        res.send('Form Submitted Successfully!');
    } catch (err) {
        console.log('Error saving form data:', err);
        res.status(500).send('There was an error while submitting the form.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
