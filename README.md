# TW5 Ticket Search Server

The server is running at [TiddlyWiki5 Ticket Search][10] - https://tw5.poc2go.com

## Installation
> The server requires [git][3] and [nodejs][4] to be pre-installed on your computer.

Clone the server repository and install it:

```cmd
git clone https://github.com/PotOfCoffee2Go/tw5-tickets.git
cd tw5-tickets
npm install
```

The more difficult part is to build the JSON database of tickets. To do so will need to use or create a [GitHub Personal Access Token][9]. Place the token in a file '.env' in the 'parent' directory of the project (ie: parent of 'tw5-tickets') which contains a line like so:

`TOKEN=YourGithubPersonalAccessToken`

From the 'tw5-tickets' project directory run `npm run get-issues` which will create the ticket database in file 'public/assets/db/github-issues.json'. If is not present a warning will be displayed when the server is launched.

Fire up the server:

```cmd
npm start
```

The TiddlyWiki should show up in your browser at address `http://localhost:8000`.

A common tweak is to change the port which the server 'listens'. This can be changed in `server/config.js` or a quick and dirty way is to pass the 'port' as a parameter when starting the server:

 `npm start -- -p 3030`

Home page would then be at `http://localhost:3030`.

### Kudos
To [Socket.io][13] network, running on [Express][11] and [TiddlyWiki][12] which are the foundations of the site back and front end.

Images provided by [Pixabay][8].

[1]: https://github.com/mykeels/steganography
[2]: https://github.com/rodrigouroz/steganography
[3]: https://git-scm.com/
[4]: https://nodejs.org/
[5]: https:/github.com/repo/issues
[6]: https://ngrok.com/
[7]: https://github.com/mixu/markdown-styles
[8]: https://pixabay.com/
[9]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
[10]: https://tw5.poc2go.com
[11]: http://expressjs.com/
[12]: https://tiddlywiki.com/
[13]: https://socket.io/
