const express = require('express')
const bodyParser = require('body-parser')

const bayes = require('./bayes')
const { sanitizeTexts } = require('./utils')
const rubyTrainer = require('./trainers/ruby-trainer')
const javaScriptTrainer = require('./trainers/javascript-trainer')
const linuxTrainer = require('./trainers/linux-trainer')
const performanceTrainer = require('./trainers/performance-trainer')

const pendingTexts = require('./extractor/tagged-bookmarks.json')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const trainers = [
  ...rubyTrainer,
  ...javaScriptTrainer,
  ...linuxTrainer,
  ...performanceTrainer
]

// const sanitizedTrainers = sanitizeTexts(trainers)

// for (const trainer of sanitizedTrainers) {
//   bayes.train(trainer.text, trainer.tag)
// }

app.get('/pending', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.json({ texts: pendingTexts })
})

app.post('/guess', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  console.log(bayes.guess(req.body.text))
  res.json({ scores: bayes.guess(req.body.text) })
})

// app.get('/trainers', (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'GET')
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
//
//   // res.json({ trainers:  })
// })

app.listen(3003)
