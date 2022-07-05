
var data = require('../../public/github-issues.json');

const MiniSearch = require('minisearch');
const miniSearch = new MiniSearch({
	fields: ['title', 'body'], // fields to search
	storeFields: [ // fields to return
		'number', 'title', 'html_url', 'comments', 'user',
		'pull_request', 'created_at']
})

// Index all documents
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


const copyTiddler = (search) =>
`title: Search TW5 Tickets - ${search.opt.searchWords}
caption: TW5 Tickets - ${search.opt.searchWords}
searchWords: ${search.opt.searchWords}
tags: TW5 tickets ${search.opt.searchWords.split(' ').join('-')}
license: [[MIT Licence]]
icon: $:/core/images/export-button
toStory: ${search.opt.toStory}
maxTickets: ${search.opt.maxTickets}
fuzzy: ${search.opt.fuzzy}
prefix: ${search.opt.prefix}
sortBy: ${search.opt.sortBy}
sortOrder: ${search.opt.sortOrder}
searchWords: ${search.opt.searchWords}
foundTickets: ${search.opt.foundTickets}
shownTickets: ${search.opt.shownTickets}
shownPage: ${search.opt.shownPage}
multiWord: ${search.opt.multiWord}
topicOrder: ${search.opt.topicOrder}
type: ${search.opt.copyType}

`;

const workingTiddler = (cfg, search) =>
`title: TiddlyWiki5 Backlog Tickets
searchWords: ${search.opt.searchWords}
tags: server
license: [[MIT Licence]]
icon: $:/poc2go/icon/cloud
toStory: ${search.opt.toStory}
maxTickets: ${search.opt.maxTickets}
fuzzy: ${search.opt.fuzzy}
prefix: ${search.opt.prefix}
sortBy: ${search.opt.sortBy}
sortOrder: ${search.opt.sortOrder}
searchWords: ${search.opt.searchWords}
foundTickets: ${search.opt.foundTickets}
shownTickets: ${search.opt.shownTickets}
shownPage: ${search.opt.shownPage}
copyButton: {{$:/core/images/import-button}}
multiWord: ${search.opt.multiWord}
topicOrder: ${search.opt.topicOrder}
copyType: ${search.opt.copyType}
copyText: Keep a copy

\\define actions()
<$macrocall $name='poc2go' command=fetch path=tickets />
\\end
\\define copySearch()
<$macrocall $name='poc2go' command={{!!toStory}} path=ticketscopy />
<$action-setfield copyButton="{{$:/core/images/done-button}}" />
<$action-setfield copyStyle="border-radius: 4px;fill: black;background:rgb(204, 204, 255);" />
<$action-setfield copyText="Copied to tiddler" />
\\end
\\define clear()
<$action-setfield searchWords="" />
\\end

<$button actions="<<poc2go 'fetch' 'tickets/Search/Suggest'>>">Topics</$button>
<$button actions="<<poc2go 'fetch' 'tickets/Search/Options'>>">Options</$button>
<$button actions="<<poc2go 'fetch' 'tickets/Search/Usage'>>">Usage</$button>
<$button actions="<<poc2go 'fetch' 'tickets/Search/About'>>">About</$button>
<span style="float: right;"><$link to="$:/poc2go/tiddler/socket-status" tooltip="Server Status">{{$:/temp/poc2go/netstat}}</$link> - v${cfg.pkg.version}</span>

<hr style="opacity: .5;">

<span style="float: left;">
<$edit-text field="searchWords" placeholder="Enter word(s) - press 'Search'" size="30" />
<$button class="bttn" actions=<<actions>> >{{$:/core/images/advanced-search-button}} Search</$button>
<$button class="bttn" actions=<<clear>> >{{$:/core/images/paint}} Clear</$button>
</span>

<span style="margin-top: .5em;float: right;">
<$button class="bttn" actions="<<copySearch>>"><span style={{!!copyStyle}}>{{!!copyButton}}</span> {{!!copyText}} </$button>&nbsp;<$checkbox field="toStory" checked="fetch-tostory" unchecked="fetch" default="fetch"> Open</$checkbox>
</span>

<div style="clear: both;padding-top: .5rem;">
	<span style="margin-left: 17%;">
		Show
		<$select field="maxTickets" actions=<<actions>> >
		<option> 1 </option>
		<option> 5 </option>
		<option> 10 </option>
		<option> 20 </option>
		<option> 30 </option>
		</$select>
		&nbsp;&nbsp;Sort by
		<$select field="sortBy" actions=<<actions>> >
		<option>score</option>
		<option>date</option>
		<option>ticket #</option>
		<option># comments</option>
		<option>submitter</option>
		</$select>
		<$select field="sortOrder" actions=<<actions>> >
		<option>ascending</option>
		<option>decending</option>
		</$select>
		&nbsp;&nbsp;&nbsp;
		<$checkbox field="fuzzy" checked="yes" unchecked="no" default="no" actions=<<actions>> > Fuzzy</$checkbox>
		&nbsp;&nbsp;
		<$checkbox field="prefix" checked="yes" unchecked="no" default="no" actions=<<actions>> > Prefix</$checkbox>
	</span>
	<span style="float: right;margin-left: -4px;margin-top: -.5em;">
		<$checkbox field="copyType" checked="application/json" unchecked="text/vnd.tiddlywiki" default="text/vnd.tiddlywiki"> Json&nbsp;</$checkbox>
	</span>
</div>
<div style="clear: both;"></div>
<hr style="opacity: .5;">
`;

// ---------------------------------
// Tickets Search Tiddler
const contentTiddler = (search) => `
<b>[[TW5 Ticket Search|https://tw5.poc2go.com]]</b> showing ${search.opt.shownTickets} of ${search.opt.foundTickets} tickets matching &quot;${search.opt.searchWords}&quot;
sorted by ${search.opt.sortBy}&nbsp;${search.opt.sortOrder}
on <$view field=fetched format=date template="DDth mmm YYYY at 0hh:0mm:0ss" />.

${search.titles}

`;

// Tickets Search JSON Tiddler
const jsonTiddler = (search) => `
${search.json}
`;

const contentFooting = () => `
{{$:/poc2go/ui/footing}}
`;

const searchTiddler = (cfg, search, copy = false) => {
	if (copy && search.opt.copyType === 'application/json') {
		return copyTiddler(search) + jsonTiddler(search);
	}
	if (copy) {
		return copyTiddler(search) + contentTiddler(search);
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

	const limits = foundTickets.slice(0, parseInt(opt.maxTickets));

	let page = 1;
	const titles = [];
	limits.forEach((ticket, idx) => {
		const title = ticket.title.replace(/</g, '&lt;').replace(/>/g, '&gt;')
		titles.push(`<pre style="border-top-left-radius: 18px; border-top-right-radius: 18px;padding-top: .4em;">[[${ticket.number}|${ticket.html_url}]] ${title}
	[[${ticket.user.login}|${ticket.user.html_url}]] ${ticket.pull_request ? '- Pull Request' : '- Issue'} on ${ticket.created_at.substr(0,10)} UTC [${ticket.comments} [[comment${ticket.comments === 1 ? '' : 's'}|${ticket.html_url}]]] (search score: ${Math.floor(ticket.score)})</pre>`);

		// Reduce fields about the user
		limits[idx].user = { login: limits[idx].user.login, html_url: limits[idx].user.html_url };
	})

	var format = '';
	opt.shownPage = `${page}`;
	opt.shownTickets = `${titles.length}`;
	opt.foundTickets = `${foundTickets.length}`;
	if (titles.length) format = titles.join('<hr style="opacity: .3; margin-top: -1em;">');
	return { opt, titles: format, json: JSON.stringify(limits, null, 2) };
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

