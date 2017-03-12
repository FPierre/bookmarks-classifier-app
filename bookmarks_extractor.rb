# Extract already tagged bookmarks from raindrop.io application

require 'awesome_print'
require 'nokogiri'
require 'json'

bookmarks = Nokogiri::HTML File.open('raindrop.io.html')

tagged_bookmarks = {}

TAGS = ['Ruby', 'JavaScript']

# ap bookmarks.css("a[tags='Ruby on Rails,Database,Web development,Back-end,Development']").first.attributes['tags'].value.split(',')

TAGS.each do |tag|
  bookmarks_titles = bookmarks.css("a[tags='#{tag}']").reduce([]) { |memo, bookmark| memo << bookmark.text }

  tagged_bookmarks[tag] = bookmarks_titles
end

ap tagged_bookmarks

File.write('tagged_bookmarks_titles.json', tagged_bookmarks.to_json)
