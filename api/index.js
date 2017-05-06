const express = require('express')
const bodyParser = require('body-parser')

const rubyTrainer = require('./trainers/ruby-trainer')
const javaScriptTrainer = require('./trainers/javascript-trainer')
const { sanitizeTexts } = require('./utils')
const bayes = require('./bayes')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const trainers = rubyTrainer.concat(javaScriptTrainer)
const sanitizeTrainers = sanitizeTexts(trainers)

for (let trainer of sanitizeTrainers) {
  bayes.train(trainer.tag, trainer.text)
}

app.post('/guess', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  bayes.guess(req.body.text)

  res.json({ winner: bayes.winner() })
})

// app.get('/trainers', (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'GET')
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
//
//   // res.json({ trainers:  })
// })

app.listen(3003)
