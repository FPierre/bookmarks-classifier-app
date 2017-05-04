const express = require('express')

const { sanitizeTexts } = require('./utils')

const app = express()

const rubyTrainer = require('./trainers/ruby-trainer')
const javaScriptTrainer = require('./trainers/javascript-trainer')
const trainers = rubyTrainer.concat(javaScriptTrainer)

app.get('/trainers', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  res.json({ trainers: sanitizeTexts(trainers) })
})

app.listen(3003)
