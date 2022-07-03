# My Bellybutton TiddlyWiki Server

> Draft

TiddlyWikis are stored by the server to present a directory list of available TiddlyWikis to load to users browser.

## Recommendations
The pages of the server have been designed with simplicity in mind. Well... as much as HTML, stylesheets, views, and javascript code can be _simple_.

The `config.js` settings allow the colors, logo, header, and such to be set to your personal preferences. Knowledge of [Express][] and [Mustache][] would be helpful - but no rocket science going on here, so even beginners should be able to make a distinctive site.

## Installation
> The server requires [git][3] and [nodejs][4] to be pre-installed on your computer.

Clone the server repository and install it:

```cmd
git clone https://github.com/PotOfCoffee2Go/bellybutton-server.git
cd bellybutton-server
npm install
```

There are various ways to fire up the server. We'll use :

```cmd
npm start
```
Barring [Murphy's Law][] the home page should show up in your browser at address `http://localhost:8000`. To see a TiddlyWiki of notes about the server, press the 'Docs' button or go to `http://localhost:8000/docs`.

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

