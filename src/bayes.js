export default class {
  train (text, tag) {
    // console.log(text)
    // console.log(tag)

    this.storeTag(tag)

    const words = this.tokenize(text)
    const length = words.length

    for (let i = 0; i < length; i++) {
      this.storeWordByTag(words[i], tag)
    }

    this.storeTextCountByTag(tag)
  }

  storedTags () {
    return JSON.parse(localStorage.getItem('tags'))
  }

// {
//   "ruby": {
//     "ruby": 5,
//     "irb": 2
//   },
//   "javascript": {
//     "console.log": 4,
//     "js": 3
//   }
// }

  storedWordsByTags () {
    return JSON.parse(localStorage.getItem('wordsByTags'))
  }

  storeTag (tag) {
    let tags = this.storedTags()

    if (!tags) {
      tags = []
    }

    if (tags.indexOf(tag) === -1) {
      tags.push(tag)
      localStorage.setItem('tags', JSON.stringify(tags))
    }
  }

  storedTextCountByTag () {
    return parseInt(localStorage.getItem('textCountByTag'))
  }

  storeWordByTag (word, tag) {
    let wordsByTags = this.storedWordsByTags()

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

    localStorage.setItem('wordsByTags', JSON.stringify(wordsByTags))
  }

  storeTextCountByTag (tag) {
    let textCountByTag = this.storedTextCountByTag()

    if (!textCountByTag) {
      textCountByTag = 0
    }

    localStorage.setItem('textCountByTag', ++textCountByTag)
  }

  tokenize (text) {
    return text.toLowerCase().replace(/\W/g, ' ').replace(/\s+/g, ' ').trim().split(' ')
  }

  resetTrainning () {
    console.log('2')
    localStorage.clear()
    // localStorage.removeItem('tags')
    // localStorage.removeItem('wordsByTags')
    // localStorage.removeItem('textCountByTag')

    console.log(localStorage.getItem('tags'))
  }
}
