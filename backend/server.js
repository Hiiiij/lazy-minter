const express = require('express')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = process.env.PORT || 8000
app.use(express.static('output'));

const cors = require('cors')
const { editionSize } = require('./input/config.js')
const cloudinary = require('cloudinary').v2

const folderName = 'NFTs'

// min and max included
const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true
// });

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getRandomNFT', (req, res) => {
  const randomNumber = randomIntFromInterval(1, editionSize)
  cloudinary.uploader.upload(`output/${randomNumber}.png`, { folder: folderName }, function (error, result) {
    if (error) {
      res.status(500).send(error)
    } else {
      console.log(result)
      res.send(result)
    }
  })
})

app.get('/getAllNFTs', (req, res) => {
  cloudinary.api.resources({
    type: 'upload',
    prefix: folderName // add your folder
  },
    function (error, result) {
      if (error) {
        res.status(500).send(error)
      } else {
        console.log(result)
        res.send(result)
      }
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
