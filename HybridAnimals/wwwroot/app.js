import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get('/', (req, res) => {
  res.redirect('/site/');
});

app.use('/site/', express.static(__dirname));

app.get('/site/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/animals', (req, res) => {
  let queryParam = req.query.animal;
  let imgsDirPath = path.join(__dirname, 'imgs'); // Update directory path

  fs.readdir(imgsDirPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    let matchingFiles = files.filter(file => file.includes(queryParam));
    matchingFiles = matchingFiles.map(file => `imgs/${file}`);
    matchingFiles = JSON.stringify(matchingFiles);
    // res.send(matchingFiles.join('\n'));
    res.send(matchingFiles);
  });
});

app.listen(3000, 'localhost', () => {
  console.log('Example app listening at http://localhost:3000');
});