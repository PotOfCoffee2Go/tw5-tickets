const { head } = require('./page-head');
const { foot } = require('./page-foot');

const tiddler = (cfg, opt) => `${head(cfg, opt)}

!!!About

<span style="float: right;"><img style="width: 110px; height: 130;" src="/assets/images/about.png"></span>

This tiddler must be loaded from and relies on an [[express|http://expressjs.com/]] server backend using the [[minisearch|https://github.com/lucaong/minisearch/blob/master/README.md]] library to perform the ticket search. Ticket data is gathered once every 24-hours from the GitHub [[TiddlyWiki5|https://github.com/Jermolene/TiddlyWiki5#readme]] issues and pull requests using the [[GitHub REST API|https://docs.github.com/en/rest]] with the results stored on the server.

This wiki must be online to be fully functional - is currrently hosted at https://tw5.poc2go.com. It allows a user to query the TiddlyWiki5 GitHub issue and pull request database and optionally produce a tiddler of search results which can be exported to other wikis, web pages, json, etc.

No server side tracking is implemented. All users are anonymous. Thus sadly, there is no way to keep your last option settings - since not using sessions, cookies, or localstorage.

${foot(cfg, opt)}
`;

// ---------------------------------
// Run the fetch issues request
exports.run = (cfg, data) => {
	return tiddler(cfg, data.content.opt);
}

