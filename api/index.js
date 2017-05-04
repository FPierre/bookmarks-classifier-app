const express = require('express')

const { sanitizeTexts } = require('./utils')
const bayes = require('./bayes')

const app = express()

const rubyTrainer = require('./trainers/ruby-trainer')
const javaScriptTrainer = require('./trainers/javascript-trainer')
const trainers = rubyTrainer.concat(javaScriptTrainer)

const sanitizeTrainers = sanitizeTexts(trainers)

for (let trainer of sanitizeTrainers) {
  bayes.train(trainer.tag, trainer.text)
}

// function resetTraining () {
//   bayes.resetTraining()
// }

bayes.guess('Vive le Javascript')
console.log(bayes.winner())

app.get('/guess', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // bayes.guess(req.text)

  res.json({ winner: bayes.winner() })
})

app.get('/trainers', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // res.json({ trainers:  })
})

app.listen(3003)
