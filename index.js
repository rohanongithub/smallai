import express from "express";
import bodyParser from "body-parser";  // Import body-parser

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json()); // To parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded form data

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to render index.ejs when accessing the root
app.get('/', (req, res) => {
    res.render('index'); // Assuming there's an 'index.ejs' file in the 'views' folder
});

// Route to handle POST requests
app.post('/submit', (req, res) => {
    const formData = req.body;  // Get the parsed form data
    console.log(formData);  // Log the data to the console
    res.send('Form data received!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
