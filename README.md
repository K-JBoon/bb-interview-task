# Blue Billywig - Programming Challenge

![placeholdd](static/logo.png)

Our new client `placeholdd` has just started integrating with our platform, but due to technical reasons they can't make a direct link between their platform and ours. They've provided us with a reference for their API and some static data for the initial integration. The static data contains a mapping from post IDs in their API to mediaclip IDs in their Blue Billywig platform ([https://demo.bbvms.com](https://demo.bbvms.com/)). They've asked for help building a solution that lets them place their video's and track user interaction.


## References

- placeholld API Reference: https://jsonplaceholder.typicode.com/
- Blue Billywig Player API Reference: https://support.bluebillywig.com/blue-billywig-player-api
- Static Data: See the `static` directory.

Using any language(s) you prefer, build an application that:

- Can display a placeholdd post as a web page by ID
- Can embed the correct video on that page
- Keeps track of which videos a user has watched at least 40% of, by updating the user using the placeholdd API
- Keeps track of which videos a user has finished watching, by updating the user using the placeholdd API

## Notes

- You're allowed to host the application in whatever way you prefer: CodePen? Docker container? Local HTTP server? On your own website? Anything goes, but make sure you also submit your solution through a Git repository.
- Commit early, commit often: Let us see how you solve the challenge step-by-step. Frequent commits and clear commit messages are a good way for us to get an idea of your thought process.
