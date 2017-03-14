export default class {
  constructor () {
    this.tags = []
    this.wordsByTags = {}
    this.textCountByTag = {}
    this.wordsCount = {}
    this.scores = {}
  }

  train (text, tag) {
    this.storeTag(tag)

    const words = this.tokenize(text)
    const length = words.length

    for (let i = 0; i < length; i++) {
      const word = words[i]

      this.storeWordByTag(word, tag)

      if (!this.wordsCount[word]) {
        this.wordsCount[word] = 0
      }

      this.wordsCount[word]++
    }

    this.storeTextCountByTag(tag)
  }

  guess (text) {
    const words = this.tokenize(text)
    const length = words.length
    const tags = this.tags
    const storedTextCountByTag = this.textCountByTag
    const textsCount = {}
    const textsInverseCount = {}
    const scores = {}
    const tagProbability = {}
    let totalDocCount = 0

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i]

      textsCount[tag] = storedTextCountByTag[tag]
      textsInverseCount[tag] = this.textInverseCount(tag)
      totalDocCount += textsCount[tag]
    }

    for (let j = 0; j < tags.length; j++) {
      const tag = tags[j]
      let logSum = 0

      tagProbability[tag] = textsCount[tag] / totalDocCount
      // console.log('tagProbability: ', tagProbability)

      for (let i = 0; i < length; i++) {
        const word = words[i]
        const _stemTotalCount = this.stemTotalCount(word)
        // console.log('_stemTotalCount: ', _stemTotalCount)
        let wordicity

        if (_stemTotalCount === 0) {
          continue
        } else {
          let tmp = this.wordsByTags[tag][word] || 0
          const wordProbability = tmp / textsCount[tag]
          // console.log('tmp: ', tmp)
          // console.log(this.wordsByTags[tag][word])
          // console.log('wordProbability: ', wordProbability)

          const wordInverseProbability = this.wordInverseTagCount(word, tag) / textsInverseCount[tag]
          console.log(': ', this.wordInverseTagCount(word, tag))
          // console.log('wordInverseProbability: ', wordInverseProbability)

          wordicity = wordProbability / (wordProbability + wordInverseProbability)
          wordicity = ((1 * 0.5) + (_stemTotalCount * wordicity)) / (1 + _stemTotalCount)

          if (wordicity === 0) {
            wordicity = 0.01
          } else if (wordicity === 1) {
            wordicity = 0.99
          }
        }

        logSum += (Math.log(1 - wordicity) - Math.log(wordicity))
        console.log(`${tag}icity of ${word}: ${wordicity}`)
      }

      scores[tag] = 1 / (1 + Math.exp(logSum))
    }

    // return scores
    this.scores = scores
  }

  storeTag (tag) {
    let tags = this.tags || []

    if (tags.indexOf(tag) === -1) {
      tags.push(tag)

      this.tags = tags
    }
  }

  // Number of times a word was seen for a given tag
  storeWordByTag (word, tag) {
    let wordsByTags = this.wordsByTags

    if (!wordsByTags) {
      wordsByTags = {}
    }

    if (!wordsByTags[tag]) {
      wordsByTags[tag] = {}
    }

    if (!wordsByTags[tag][word]) {
      wordsByTags[tag][word] = 0
    }

    let count = wordsByTags[tag][word]

    wordsByTags[tag][word] = ++count

    this.wordsByTags = wordsByTags
  }

  storeTextCountByTag (tag) {
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
    const tags = this.tags
    let total = 0

    for (let i = 0, length = tags.length; i < length; i++) {
      if (tags[i] === tag) {
        continue
      }

      total += parseInt(this.textCount(tags[i]))
    }

    return total
  }

  wordInverseTagCount (word, tag) {
    const tags = this.tags
    let total = 0

    for (let i = 0, length = tags.length; i < length; i++) {
      if (tags[i] === tag) {
        continue
      }

      let tmp = this.wordsByTags[tags[i]][word] || 0

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

  winner () {
    let bestScore = 0
    let bestLabel = null

    for (var tag in this.scores) {
      if (this.scores[tag] > bestScore) {
        bestScore = this.scores[tag]
        bestLabel = tag
      }
    }

    return { tag: bestLabel, score: bestScore }
  }

  resetTrainning () {
    this.tags = []
    this.wordsByTags = {}
    this.textCountByTag = {}
  }
}
