import {promises as fs} from 'fs'
import express from 'express'
const app = express()

app.get('/', async (req, res) => {
  console.log("request to '/', sending back html")
  res.type('html')
  let fileContents = await fs.readFile("index.html")
  res.send(fileContents)
})

app.get('/*', async (req, res) => {
  let filePath = req.url
  console.log("query path looking for " + filePath)
  filePath = filePath.startsWith('/') ? filePath.slice(1) : filePath

  res.type(filePath.slice(filePath.lastIndexOf(".") + 1))
  try {
    let fileContents = await fs.readFile(filePath)
    res.send(fileContents)
  } catch(error) {
    console.log("No file found")
  }
})

app.listen(3000, 'localhost', () => {
  console.log('Example app listening at http://localhost:3000')
})