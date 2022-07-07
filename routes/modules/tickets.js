// Components of search tiddler
const {
	copyTiddler,
  workingTiddler,
  contentTiddler,
  jsonTiddler,
  contentFooting } = require('../tiddlers/Search/search');

// Issue and pull requests gathered from GitHub
var data = require('../../public/github-issues.json');

// Module that performs the search
const MiniSearch = require('minisearch');
const miniSearch = new MiniSearch({
	fields: ['title', 'body'], // fields to search
	storeFields: [ // fields to return
		'number', 'title', 'html_url', 'comments', 'user',
		'pull_request', 'created_at']
})
miniSearch.addAll(data)

// Default ticket fields
exports.ticketDefaults = (opt) => {
	return Object.assign({
		searchWords: '',
		toStory: 'fetch-tostory',
		maxTickets: '10',
		fuzzy: 'no',
		prefix: 'no',
		sortBy: 'date',
		sortOrder: 'decending',
		shownPage: '0',
		shownTickets: '0',
		foundTickets: '0',
		copyButton: '{{$:/core/images/import-button}}',
		multiWord: 'single',
		topicOrder: 'rank',
		copyType: 'text/vnd.tiddlywiki',
	}, opt);
}

// Create the working search tiddler or a local copy
const searchTiddler = (cfg, search, copy = false) => {
	if (copy && search.opt.copyType === 'application/json') {
		return copyTiddler(search) + jsonTiddler(search);
	}
	if (copy) {
		return copyTiddler(search) +
			'<b>[[TW5 Ticket Search|https://tw5.poc2go.com]]</b>' +
			contentTiddler(search);
	}
	return workingTiddler(cfg, search) + contentTiddler(search) + contentFooting();
};

// ---------------------------------
// Search tickets
const ticketSearch = (opt) => {
	// Search with default options
	const miniOpt = {
		fuzzy: opt.fuzzy === 'yes' ? 0.2 : false,
		prefix: opt.prefix === 'yes' ? true : false,
	}
	const foundTickets = miniSearch.search(opt.searchWords, miniOpt);
	sortTickets(foundTickets, opt);

	// Limit to number of tickets user requested
	const limits = foundTickets.slice(0, parseInt(opt.maxTickets));

	// Create the wikitext to display the results
	let page = 1;
	const titles = [];
	limits.forEach((ticket, idx) => {
		const title = ticket.title.replace(/</g, '&lt;').replace(/>/g, '&gt;')
		titles.push(`<pre style="border-top-left-radius: 18px; border-top-right-radius: 18px;padding-top: .4em;">[[${ticket.number}|${ticket.html_url}]] ${title}
	[[${ticket.user.login}|${ticket.user.html_url}]] ${ticket.pull_request ? '- Pull Request' : '- Issue'} on ${ticket.created_at.substr(0,10)} UTC [${ticket.comments} [[comment${ticket.comments === 1 ? '' : 's'}|${ticket.html_url}]]] (search score: ${Math.floor(ticket.score)})</pre>`);

		// Reduce fields about the user (makes JSON copy managable size)
		limits[idx].user = { login: limits[idx].user.login, html_url: limits[idx].user.html_url };
	})

	// Update search tiddler field values
	var format = '';
	opt.shownPage = `${page}`;
	opt.shownTickets = `${titles.length}`;
	opt.foundTickets = `${foundTickets.length}`;
	// Format results for display
	if (titles.length) {
		format = titles.join('<hr style="opacity: .3; margin-top: -1em;">');
	}

	return { opt, titles: format, json: JSON.stringify(limits, null, 2) };
}

// Sort tickets based on users sort options
const sortTickets = (foundTickets, opt) => {
	switch (opt.sortBy) {
		case 'score':
			if (opt.sortOrder === 'decending') {
				foundTickets.sort((a, b) => b.score - a.score);
			} else {
				foundTickets.sort((a, b) => a.score - b.score);
			}
			break;

		case 'date':
			if (opt.sortOrder === 'decending') {
				foundTickets.sort((a, b) => b.created_at > a.created_at ? 1 : -1);
			} else {
				foundTickets.sort((a, b) => b.created_at < a.created_at ? 1 : -1);
			}
		break;

		case '# comments':
			if (opt.sortOrder === 'decending') {
				foundTickets.sort((a, b) => b.comments - a.comments);
			} else {
				foundTickets.sort((a, b) => a.comments - b.comments);
			}
			break;

		case 'ticket #':
			if (opt.sortOrder === 'decending') {
				foundTickets.sort((a, b) => b.number - a.number);
			} else {
				foundTickets.sort((a, b) => a.number - b.number);
			}
			break;

		case 'submitter':
			if (opt.sortOrder === 'decending') {
				foundTickets.sort((a, b) => b.user.login > a.user.login ? 1 : -1);
			} else {
				foundTickets.sort((a, b) => b.user.login < a.user.login ? 1 : -1);
			}
		break;

		default: break;
	}
}

// ---------------------------------
// Run the fetch issues request
exports.run = (cfg, data, copy = false) => {
	const opt = data.content.opt;

	let maxTickets = parseInt(opt.maxTickets);
	if (isNaN(maxTickets)) { maxTickets = 0; }

	if (maxTickets < 1 || maxTickets > 30) {
		opt.maxTickets = '10';
	}

	const search = ticketSearch(opt);
	return searchTiddler(cfg, search, copy);
}
