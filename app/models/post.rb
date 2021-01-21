require 'smarter_csv'

class Post < ActiveResource::Base
  self.include_format_in_path = false
  self.site = "http://jsonplaceholder.typicode.com"

  def mediaclip_id
    processed_csv = SmarterCSV.process('static/mapping.csv')

    mediaclips_mapping = processed_csv.map do |mapping| 
      { mapping[:id] => mapping[:mediaclip_id] }
    end.reduce({}, :merge)

    return mediaclips_mapping[id]
  end
end