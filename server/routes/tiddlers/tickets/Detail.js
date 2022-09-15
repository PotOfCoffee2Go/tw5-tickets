// This tiddler starts the process of displaying ticket detail
// A TiddlyWiki action of
//   <<poc2go fetch-tostory path=<<currentTiddler>> >>
//  with currentTiddler fields path=tickets/Detail and
//   ticketNbr=xxxx
//  or can use the poc2go options param
//   options='{ "path": "tickets/Detail", "ticketNbr": "xxxx"}'

// When tiddlyWiki displays the tiddler the iframe is fetched.
//  that iframe has a script which fetches the ticket and comments
//  from GitHub, formats and creates/displays the info
//  replacing this tiddler ie: 'TiddlyWiki5 Ticket Detail - xxxx'

const tiddler = (cfg, opt) => `title: TiddlyWiki5 Ticket Detail - ${opt.ticketNbr}
tags: server Gathering...
toStory: ${opt.toStory}

<iframe style="display: none;" src="/detail/${opt.ticketNbr}"></iframe>

`;

// ---------------------------------
// Run the fetch issues request
exports.run = (cfg, data, db) => {
	data.content.opt.ticketNbr = data.content.opt.ticketNbr.replace(/^\D*(\d+)\D*.*$/,'$1');
	if (!data.content.opt.ticketNbr) return ''; // No or invalid ticket number
	return tiddler(cfg, data.content.opt);
}

