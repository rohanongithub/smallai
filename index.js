import express from 'express';
import bodyParser from 'body-parser';
import { CohereClient } from "cohere-ai";

const app = express();
const port = 3000;

// Initialize Cohere
const cohere = new CohereClient({
  token: "o6DdGd0awe4vhcOEBS4r3RJOt0PdNB4iC60lIE40",
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index', { generatedText: null });
});
app.post('/response', async (req, res) => {
    try {
        console.log("BODY:", req.body);
      const inputText = req.body.inputText;
      const promptInput = `Please generate a creative response based on the following prompt: "${inputText}". Be imaginative and detailed.`

      console.log("Received inputText:", inputText); // 👈 Add this
  
      if (!inputText || typeof inputText !== 'string') {
        throw new Error("Invalid inputText");
      }
  
      const response = await cohere.generate({
        model: "command",
        prompt: promptInput,
        max_tokens: 150,
        temperature: 0.9,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
        
      });
      
      const generatedText = response.generations[0].text;
      res.render('index', { generatedText });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error generating text");
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
