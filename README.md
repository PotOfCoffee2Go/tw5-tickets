# My TW5 Ticket Search Server

> Draft

## Recommendations
The `config.js` settings allow the colors, logo, header, and such to be set. Mostly relating to pages displayed in tiddler iframes. Knowledge of [Express][] and [Mustache][] would be helpful. This site is not currently using iframes (is sending tiddlers to the TiddlyWiki front-end).


## Installation
> The server requires [git][3] and [nodejs][4] to be pre-installed on your computer.

Clone the server repository and install it:

```cmd
git clone https://github.com/PotOfCoffee2Go/tw5-tickets.git
cd tw5-tickets
npm install
```

There are various ways to fire up the server. We'll use :

```cmd
npm start
```
Barring [Murphy's Law][] the home page should show up in your browser at address `http://localhost:8000`.

A common tweak is to change the port which the server 'listens'. This can be changed in `config.js` or a quick and dirty way is to pass the 'port' as a parameter when starting the server:

 `npm start -- -p 3030`

would listen for browser address

`http://localhost:3030`.

### Kudos
To [Express][], [Mustache][], and [TiddlyWiki][] which are used to run the site.

[yargs][] processes server command line arguments.

Images provided by [Pixabay][8].

[1]: https://github.com/mykeels/steganography
[2]: https://github.com/rodrigouroz/steganography
[3]: https://git-scm.com/
[4]: https://nodejs.org/
[5]: https:/github.com/repo/issues
[6]: https://ngrok.com/
[7]: https://github.com/mixu/markdown-styles
[8]: https://pixabay.com/

