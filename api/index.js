// const express = require('express')
const stopWords = require('stopwords-json')

// const app = express.express()

// console.log(stopWords['fr'])
// console.log(stopWords['en'])

// const rubyTrainer = require('./trainers/ruby-trainer')
// const javaScriptTrainer = require('./trainers/javascript-trainer')

// const trainers = rubyTrainer.concat(javaScriptTrainer)

// TODO: remove stop words here

// app.get('/trainers', (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'GET')
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
//
//   res.json({ trainers: trainers })
// })
//
// app.listen(3003)

String.prototype.removeStopWords () {
  const originalString = this.valueOf()

  // Split all the individual words in the phrase
  const words = originalString.match(/[^\s]+|\s+[^\s+]$/g)

  for (let x = 0; x < words.length; x++) {
    for (let y = 0; y < stopWords.length; y++) {
      // Trim, remove non-alpha and lower case
      const word = words[x].replace(/\s+|[^a-z]+/ig, '').toLowerCase()
      const stopWord = stopWords[y]

      // If the word matches the stop word, remove it from the keywords
      if (word === stopWord) {
        // Build the regex
        let regexStr = '^\\s*' + stopWord + '\\s*$' // Only word
        regexStr += '|^\\s*' + stopWord + '\\s+'    // First word
        regexStr += '|\\s+' + stopWord + '\\s*$'    // Last word
        regexStr += '|\\s+' + stopWord + '\\s+'     // Word somewhere in the middle
        regex = new RegExp(regexStr, 'ig')

        // Remove the word from the keywords
        originalString = originalString.replace(regex, ' ')
      }
    }
  }

  return originalString.replace(/^\s+|\s+$/g, '')
}
