## Considered using Ionic.
Gives easy access to mobile-friendly UI tools & still offer the unified experience on for all users (web/iOS/Android). 

Decided not to; 4 hours is a relatively short time, the first requirement is for the videos to be accessible through web URL based navigation. This would require extra work in Ionic and is not a mobile-friendly form of navigation at all.
An alternative would be to build a mobile navigation interface, but that would cost too much time.

## Optimizing the way mapping is parsed
Currently the file is being parsed & sorted on every request of a single post.

Parsing it in a static class & storing the result in a single place would speed up this part of the application.

If we wish to have more control over the way parsing is done, it would be a good idea to move the parsing & sorting to a separate file entirely, and have the Post only have to request the correct mapping of its own ID.

## Finding out why we need the `rexml` gem
Before adding it, the following error occurred when running Rspec:
```
An error occurred while loading ./spec/models/post_spec.rb.
Failure/Error: require File.expand_path('../config/environment', __dir__)

LoadError:
  cannot load such file -- rexml/document
# ./config/application.rb:20:in `<top (required)>'
# ./config/environment.rb:2:in `require_relative'
# ./config/environment.rb:2:in `<top (required)>'
# ./spec/rails_helper.rb:4:in `<top (required)>'
# ./spec/models/post_spec.rb:1:in `<top (required)>'
```

The internet did not provide any useful information, and adding the `rexml` gem was just a wild guess. It's working now, but I'd have liked to spend more time on figuring out what is going on here.

## Less embedded javascript
Due to me already spending a lot of time (~30 minutes) fixing RSpec errors, I did not want to spend a lot more time on fiddling with Rails.

I decided to embed all of my JavaScript on the 'show' page. Ideally I would have moved the scripts over to separate files.

## Tested javascript
Due to me already spending a lot of time on setup of frameworks, javascript testing has been skipped and has all been done manually.
