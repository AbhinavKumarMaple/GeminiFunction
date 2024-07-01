require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 5000;

// Use CORS
app.use(cors());

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString('base64'),
      mimeType,
    },
  };
}

app.post('/query-image', upload.single('image'), async (req, res) => {
  const imagePath = req.file.path;
  const customQuery = req.body.customQuery || '';

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const inputPrompt = `
      You will receive input images as invoices &
      you will have to answer questions based on the input image.
      Custom Query: ${customQuery}
    `;
    const imageParts = [fileToGenerativePart(imagePath, 'image/jpg')];

    const result = await model.generateContent([inputPrompt, ...imageParts]);
    const response = await result.response;
    const text = await response.text();

    // Clean up the uploaded file
    fs.unlinkSync(imagePath);

    res.json({ result: text });
  } catch (error) {
    console.error('Error querying the Gemini LLM model:', error);
    res.status(500).json({ error: 'Error querying the Gemini LLM model' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
