const fs = require('fs')
const cheerio = require('cheerio')

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
            lang: 'en',
            text: $(elem).text()
          })
        }
      }
    }
  })
} catch (e) {
  console.log('Error:', e.stack)
}

console.log(taggedBookmarks)

// File.write('tagged_bookmarks_titles.json', tagged_bookmarks.to_json)
