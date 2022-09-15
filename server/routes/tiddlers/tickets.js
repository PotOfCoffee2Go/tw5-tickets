// Other tiddlers (pages) used with ticket search
const searchOptions = require('./tickets/Options');
const searchUsers = require('./tickets/Users');
const searchUsage = require('./tickets/Usage');
const searchSuggest = require('./tickets/Suggest');
const searchAbout = require('./tickets/About');
const searchDetail = require('./tickets/Detail');

// Components of search tiddler
const {
	copyTiddler, workingTiddler,
	contentTiddler, nothingRequested, contentFooting,
	jsonTiddler } = require('./tickets/search');

// Issue and pull requests gathered from GitHub
// Must have .json file extension
const issuesDb = '../../../public/assets/db/github-issues.json';
var ghdata;
try {
	require.resolve(issuesDb);
	ghdata = require(issuesDb);
} catch(e) {
	ghdata = [];
	console.log(`\x1b[31mTicket database - ${issuesDb} does not exist.\x1b[0m`);
	console.log(`\x1b[31mNo tickets to search! Run 'npm run get-issues'\x1b[0m`);
}

console.log(`\x1b[35mDatabase contains ${ghdata.length} tickets\x1b[0m`);

// Module that performs the search
const MiniSearch = require('minisearch');
const miniSearch = new MiniSearch({
	fields: ['title', 'body'], // fields to search
	storeFields: [ // fields to return
		'number', 'title', 'body', 'html_url', 'comments', 'user',
		'pull_request', 'created_at']
})
miniSearch.addAll(ghdata)

// Default ticket fields
ticketDefaults = (opt) => {
	return Object.assign({
		searchWords: '',
		path: 'tickets',
		toStory: 'fetch-tostory',
		maxTickets: '10',
		fuzzy: 'no',
		prefix: 'no',
		sortBy: 'date',
		sortOrder: 'decending',
		getPage: 1,
		skipTickets: 0,
		shownPage: '0',
		shownTickets: '0',
		foundTickets: '0',
		copyButton: '{{$:/core/images/import-button}}',
		multiWord: 'single',
		topicOrder: 'rank',
		copyType: 'text/vnd.tiddlywiki',
		submitter: '',
		submitterUrl: '',
		submitterButton: 'display: none;',
		combineWith: 'or',
		userOrder: 'rank',
	}, opt);
}

// Create the working search tiddler or a local copy
const searchTiddler = (cfg, search, copy = false) => {
	if (search.opt.nothingRequested) {
		return workingTiddler(cfg, search) + nothingRequested() + contentFooting();
	}
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
const ticketSearch = (opt, copy) => {
	opt.searchWords = opt.searchWords.trim();
	// No search parameters requested
	if (!opt.submitter && !opt.searchWords) {
		opt.nothingRequested = true;
		return { opt, titles: '', json: '[]' };
	}

	// Search with default options
	const miniOpt = {
		fuzzy: opt.fuzzy === 'yes' ? 0.2 : false,
		prefix: opt.prefix === 'yes' ? true : false,
		filter: (result) => true,
		combineWith: opt.combineWith.toUpperCase(),
	}
	// Search only for tickets submitted by user
	if (opt.submitter) {
		miniOpt.filter = (result) => opt.submitter === result.user.login;
	}
	// Select tickets matching the requested words and/or submitter
	var foundTickets;
	if (opt.searchWords) {
		foundTickets = miniSearch.search(opt.searchWords, miniOpt);
	}
	else {
		foundTickets = ghdata.filter(iss => opt.submitter === iss.user.login);
	}

	// Sort as requested
	sortTickets(foundTickets, opt);

	// Go to page requested
	pageTickets(foundTickets, opt)

	// Limit to number of tickets user requested
	const limits = foundTickets.slice(0, parseInt(opt.maxTickets));


	// Create the wikitext to display the results
	let page = 1;
	const titles = [];
	limits.forEach((ticket, idx) => {
		//console.log(ticket.body);
		// userLink is TW button unless keeping a copy then is a GitHub link
		var userLink = `<$button class="tc-btn-invisible tc-tiddlylink" actions="""<<addSubmitter ${ticket.user.login} "${ticket.user.html_url}">>""" >${ticket.user.login}</$button>`;
		var moreBttn = `<$button class="tc-btn-invisible tc-tiddlylink" actions="""<<poc2go 'fetch-tostory' 'tickets/Detail' '{"ticketNbr": "${ticket.number}"}'>>""">#${ticket.number}</$button>`;

		if (copy) {
			userLink = `[[${ticket.user.login}|${ticket.user.html_url}]]`;
			moreBttn = `[[#${ticket.number}|${ticket.html_url}]]`;
		}
		const title = ticket.title.replace(/</g, '&lt;').replace(/>/g, '&gt;')
		titles.push(`<pre style="border-top-left-radius: 18px; border-top-right-radius: 18px;padding-top: .4em;">${moreBttn} ${title}
	${userLink} ${ticket.pull_request ? '- Pull Request' : '- Issue'} on ${ticket.created_at.substr(0,10)} UTC [${ticket.comments} comment${ticket.comments === 1 ? '' : 's'}] ${isNaN(ticket.score) ? '' : '(search score: '+Math.floor(ticket.score)+')'}</pre>`);
	})

	// Update search tiddler field values
	var format = '';
	opt.shownPage = `${page}`;
	opt.shownTickets = `${titles.length}`;
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

// Figure out what page to display
const pageTickets = (foundTickets, opt) => {
	opt.foundTickets = `${foundTickets.length}`;
	opt.skipTickets = (opt.getPage - 1) * parseInt(opt.maxTickets);
	//foundTickets.splice(0, skipTickets);
}

const regularSearch = (cfg, data, copy) => {
	const search = ticketSearch(data.content.opt, copy);
	return searchTiddler(cfg, search, copy);
}

const route = (cfg, data, copy) => {
	const opt = data.content.opt;
	if (opt.reset) {
		data.content.opt = {};
	}
	data.content.opt = ticketDefaults(data.content.opt);
	if (data.content.path === 'ticketscopy') return regularSearch(cfg, data, true);
	if (data.content.path.indexOf('Options') > -1) return searchOptions.run(cfg, data);
	if (data.content.path.indexOf('Usage') > -1) return searchUsage.run(cfg, data);
	if (data.content.path.indexOf('Users') > -1) return searchUsers.run(cfg, data);
	if (data.content.path.indexOf('Suggest') > -1) return searchSuggest.run(cfg, data);
	if (data.content.path.indexOf('About') > -1) return searchAbout.run(cfg, data);
	if (data.content.path.indexOf('Detail') > -1) return searchDetail.run(cfg, data, ghdata);

	return regularSearch(cfg, data, false);
}


// ---------------------------------
// Run the fetch issues request
exports.run = (cfg, data, copy = false) => {
	let maxTickets = parseInt(data.content.opt.maxTickets);
	if (isNaN(maxTickets)) { maxTickets = 0; }

	if (maxTickets < 1 || maxTickets > 30) {
		data.content.opt.maxTickets = '10';
	}
	return route(cfg, data, copy);
}
