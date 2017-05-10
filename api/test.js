const rubyTrainer = require('./trainers/ruby-trainer')
const javaScriptTrainer = require('./trainers/javascript-trainer')
const { sanitizeTexts } = require('./utils')
const bayes = require('./bayes')

const trainers = rubyTrainer.concat(javaScriptTrainer)
const sanitizedTrainers = sanitizeTexts(trainers)

for (const trainer of sanitizedTrainers) {
  bayes.train(trainer.text, trainer.tag)
}

console.log(bayes.guess("JavaScript c'est bien, mais Ruby c'est pas mal aussi"))
