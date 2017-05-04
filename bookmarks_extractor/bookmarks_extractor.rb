# Extract already tagged bookmarks from raindrop.io application
# TODO: Gemfile
# TODO: Use JS instead?

require 'awesome_print'
require 'json'
require 'nokogiri'
require 'uri'

raw_bookmarks = Nokogiri::HTML(File.open('raindrop.io.html'))
tagged_bookmarks = {}

TAGS = %w[Ruby JavaScript].freeze

# ap raw_bookmarks.css("a[tags='Ruby on Rails,Database,Web development,Back-end,Development']").first.attributes['tags'].value.split(',')
# ap raw_bookmarks.css("a[tags='Ruby on Rails']").first.attributes['href'].value

TAGS.each do |tag|
  tagged_bookmarks[tag] = raw_bookmarks.css("a[tags='#{tag}']").reduce([]) do |memo, bookmark|
    href = bookmark.attributes['href'].value
    host = URI(href).host
    domain = host.match(/^(?:.+\.)?(.+)\..+$/)[1]
    ext = host.match(/^(?:.+\.)?.+\.(.+)$/)[1]

    # ap host
    # ap ext

    # ap bookmark.text
    # original_title = bookmark.text.gsub(/\W|\s+/xi, '')
    original_title = bookmark.text.gsub(/\s*\W\s*/i, ' ')
    # ap original_title
    sanitized_title = original_title.gsub(/#{domain}/i, ' ').strip

    ap sanitized_title

    lang = ext == 'fr' ? 'fr' : 'en'

    memo << {
      title: sanitized_title,
      lang: lang
    }
  end
end

# ap tagged_bookmarks

File.write('tagged_bookmarks_titles.json', tagged_bookmarks.to_json)
