var express = require('express')
var app = express()

var rubyTrainer = require('./trainers/ruby-trainer')
var javaScriptTrainer = require('./trainers/javascript-trainer')

var trainers = rubyTrainer.concat(javaScriptTrainer)

app.get('/trainers', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  res.json({ trainers: trainers })
})

app.listen(3003)
