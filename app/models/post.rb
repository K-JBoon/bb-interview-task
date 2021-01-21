require 'smarter_csv'

class Post < ActiveResource::Base
  self.include_format_in_path = false
  self.site = "http://jsonplaceholder.typicode.com"

  def mediaclip_id
    mediaclips_mapping = SmarterCSV.process('static/mapping.csv')

    sorted_by_id = mediaclips_mapping.sort_by { |mapping| mapping[:id] }

    return sorted_by_id[id][:mediaclip_id]
  end
end