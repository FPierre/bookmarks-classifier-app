class Bayes {
  constructor () {
    this.tags = []
    this.wordsByTag = {}
    this.textCountByTag = {}
    this.wordsCount = {}
    this.scores = {}
  }

  train (text, tag) {
    this.setTag(tag)

    const words = this.tokenize(text)

    for (const word of words) {
      this.setWordByTag(word, tag)
      this.setWordsCount(word)
    }

    this.setTextCountByTag(tag)
  }

  guess (text) {
    const words = this.tokenize(text)
    const textsCount = {}
    const textsInverseCount = {}
    const scores = {}
    const tagProbability = {}
    let totalDocCount = 0

    for (const tag of this.tags) {
      textsCount[tag] = this.textCountByTag[tag]
      textsInverseCount[tag] = this.textInverseCount(tag)
      totalDocCount += textsCount[tag]
    }

    for (const tag of this.tags) {
      let logSum = 0

      tagProbability[tag] = textsCount[tag] / totalDocCount

      for (const word of words) {
        const _stemTotalCount = this.stemTotalCount(word)
        let wordicity


        if (_stemTotalCount === 0) {
          continue
        } else {
          let tmp = this.wordsByTag[tag][word] || 0
          const wordProbability = tmp / textsCount[tag]

          const wordInverseProbability = this.wordInverseTagCount(word, tag) / textsInverseCount[tag]

          wordicity = wordProbability / (wordProbability + wordInverseProbability)
          wordicity = ((1 * 0.5) + (_stemTotalCount * wordicity)) / (1 + _stemTotalCount)

          if (wordicity === 0) {
            wordicity = 0.01
          } else if (wordicity === 1) {
            wordicity = 0.99
          }
        }

        logSum += (Math.log(1 - wordicity) - Math.log(wordicity))
      }

      scores[tag] = 1 / (1 + Math.exp(logSum))
    }

    this.scores = scores

    // return this.winner()
    return this.scores
  }

  resetTraining () {
    this.tags = []
    this.wordsByTag = {}
    this.textCountByTag = {}
  }

  winner () {
    let bestScore = 0
    let bestTag = null

    for (const tag in this.scores) {
      if (this.scores[tag] > bestScore) {
        bestScore = this.scores[tag]
        bestTag = tag
      }
    }

    return { tag: bestTag, score: bestScore }
  }

  setTag (tag) {
    if (this.tags.indexOf(tag) === -1) {
      this.tags.push(tag)
    }
  }

  // Number of times a word was seen for a given tag
  setWordByTag (word, tag) {
    let wordsByTag = this.wordsByTag

    if (!wordsByTag[tag]) {
      wordsByTag[tag] = {}
    }

    if (!wordsByTag[tag][word]) {
      wordsByTag[tag][word] = 0
    }

    let count = wordsByTag[tag][word]
    wordsByTag[tag][word] = ++count

    this.wordsByTag = wordsByTag
  }

  setWordsCount(word) {
    if (!this.wordsCount[word]) {
      this.wordsCount[word] = 0
    }

    this.wordsCount[word]++
  }

  setTextCountByTag (tag) {
    let textCountByTag = this.textCountByTag

    if (!textCountByTag[tag]) {
      textCountByTag[tag] = 0
    }

    this.textCountByTag[tag] = ++textCountByTag[tag]
  }

  textCount (tag) {
    return this.textCountByTag[tag] || 0
  }

  textInverseCount (tag) {
    let total = 0

    for (const _tag of this.tags) {
      if (_tag === tag) {
        continue
      }

      total += parseInt(this.textCount(tag))
    }

    return total
  }

  wordInverseTagCount (word, tag) {
    let total = 0

    for (const _tag of this.tags) {
      if (_tag === tag) {
        continue
      }

      let tmp = this.wordsByTag[_tag][word] || 0

      total += tmp
    }

    return total
  }

  stemTotalCount (word) {
    return this.wordsCount[word] || 0
  }

  tokenize (text) {
    return text.toLowerCase().replace(/\W/g, ' ').replace(/\s+/g, ' ').trim().split(' ')
  }
}

module.exports = new Bayes()
