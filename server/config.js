// Server configuration options allow the site to be personalized
const cfg = {

// ------ Server Options
	// Port the server listens for requests
	listenPort: 8000,

	// GitHub API repository, users, and issues to search
	repolink: 'https://github.com/Jermolene/TiddlyWiki5',
	userslink: 'https://github.com',
	ticketslink: 'https://api.github.com/repos/Jermolene/TiddlyWiki5/issues',

	// Subdirectory path in 'public' to hold TiddlyWikis
	// Do not include '/public/' - just the subdirectory path
	// ex: 'tw', 'tiddlywiki/mine', 'store'
	twDir: 'wikis',

	// Display 'get' URL's on console
	logUrl: false,

// ------ Page Layout
// Each web page is displayed in a tiddler as an iframe with class="server-view"
// ex: <iframe class="server-view" src="/home" />

	// A logo for the site
	logo: '<img src="/assets/logo.png" style="float: left; width: 24px; margin-right: 6px;">',

	// Heading on top of page
	heading: ``,

	// Footer on bottom of page
	footer: `<div class="footer-text"><hr>Images from <a href="https://pixabay.com" target="_blank">Pixabay</a><hr></div>`,

	// Display help/hints in web pages
	inlineHelp: true,

	// HTML inserted in page <head> tag
	//  the '/assigntw.js' script links the page to TiddlyWiki $tw functions
	head: `
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icon" type="image/png" href="/favicon.png" />
	<script src="/assigntw.js"></script>
	`,

}

// Theme and page specific styles
cfg.styles = require('./routes/styles');

// Log file
cfg.log = { info: () => {} }; // Remove logging to file
//cfg.log = require('./logger');

// Package info
cfg.pkg = require('../package.json');

exports.cfg = cfg;
