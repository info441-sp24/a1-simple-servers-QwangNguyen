import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get('/', async (req, res) => {
  console.log("request to '/', sending back html");
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/*', async (req, res) => {
  let filePath = req.url;
  console.log("query path looking for " + filePath);
  filePath = filePath.startsWith('/') ? filePath.slice(1) : filePath;

  try {
    let absolutePath = path.join(__dirname, filePath);
    if (!absolutePath.startsWith(__dirname)) {
      throw new Error('Invalid file path');
    }

    let fileExtension = path.extname(absolutePath).slice(1);
    res.type(fileExtension);
    
    res.sendFile(absolutePath);
  } catch(error) {
    console.error("Error sending file:", error);
    res.status(404).send("File not found");
  }
});

app.listen(3000, 'localhost', () => {
  console.log('Example app listening at http://localhost:3000');
});