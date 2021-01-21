### Considered using Ionic.
Gives easy access to mobile-friendly UI tools & still offer the unified experience on for all users (web/iOS/Android). 

Decided not to; 4 hours is a relatively short time, the first requirement is for the videos to be accessible through web URL based navigation. This would require extra work in Ionic and is not a mobile-friendly form of navigation at all.
An alternative would be to build a mobile navigation interface, but that would cost too much time.

### Optimizing the way mapping is parsed
Currently the file is being parsed & sorted on every request of a single post.

Parsing it in a static class & storing the result in a single place would speed up this part of the application.

If we wish to have more control over the way parsing is done, it would be a good idea to move the parsing & sorting to a separate file entirely, and have the Post only have to request the correct mapping of its own ID.
