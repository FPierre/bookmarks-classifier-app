const fs = require('fs')
const cheerio = require('cheerio')
const franc = require('franc-min')

const tags = ['Ruby', 'JavaScript', 'Performance', 'Linux']
const taggedBookmarks = {}

try {
  const content = fs.readFileSync('api/extractor/raindrop.io.html', 'utf8')
  const $ = cheerio.load(content)

  $('dt a').each((i, elem) => {
    const t = $(elem).attr('tags')

    if (t) {
      const s = t.split(',')
      // console.log(s)

      for (const r of s) {
        if (tags.includes(r)) {
          console.log(r)

          if (!taggedBookmarks[r]) {
            taggedBookmarks[r] = []
          }

          taggedBookmarks[r].push({
            tag: r,
            lang: franc($(elem).text()),
            text: $(elem).text()
          })
        }
      }
    }
  })
} catch (e) {
  console.log('Error:', e.stack)
}

fs.writeFile('api/extractor/tagged-bookmarks.json', JSON.stringify(taggedBookmarks, undefined, 2), (err) => {
  if (err) {
   return console.log(err)
  }

  console.log('The file was saved!')
})
