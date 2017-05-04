const express = require('express')
const stopWords = require('stopwords-json')

const app = express()

// console.log(stopWords['fr'])
// console.log(stopWords['en'])

const rubyTrainer = require('./trainers/ruby-trainer')
const javaScriptTrainer = require('./trainers/javascript-trainer')

const trainers = rubyTrainer.concat(javaScriptTrainer)

// sanitizeTitles(trainers)

app.get('/trainers', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  res.json({ trainers: sanitizeTitles(trainers) })
})

app.listen(3003)

function sanitizeTitles (trainers) {
  for (let i = 0; i <= trainers.length; i++) {
    const trainer = trainers[i]

    if (trainer === undefined) {
      continue
    }

    const stopWordsByLang = stopWords['en']

    removeStopWords(trainer['text'], stopWordsByLang)
  }
}

function removeStopWords (title, stopWordsByLang) {
  // Split all the individual words in the phrase
  const words = title.match(/[^\s]+|\s+[^\s+]$/g)

  for (let x = 0; x < words.length; x++) {
    for (let y = 0; y < stopWordsByLang.length; y++) {
      // Trim, remove non-alpha and lower case
      const word = words[x].replace(/\s+|[^a-z]+/ig, '').toLowerCase()
      const stopWord = stopWordsByLang[y]

      // If the word matches the stop word, remove it from the keywords
      if (word === stopWord) {
        // Build the regex
        let regexStr = '^\\s*' + stopWord + '\\s*$' // Only word
        regexStr += '|^\\s*' + stopWord + '\\s+'    // First word
        regexStr += '|\\s+' + stopWord + '\\s*$'    // Last word
        regexStr += '|\\s+' + stopWord + '\\s+'     // Word somewhere in the middle
        regex = new RegExp(regexStr, 'ig')

        // Remove the word from the keywords
        title = title.replace(regex, ' ')
      }
    }
  }

  return title.replace(/^\s+|\s+$/g, '')
}
