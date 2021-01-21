class Post < ActiveResource::Base
  self.include_format_in_path = false
  self.site = "http://jsonplaceholder.typicode.com"
end