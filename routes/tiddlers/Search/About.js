const tid = (opt) => `created: 20220618230816674
modified:	20220618230816674
creator: PotOfCoffee2Go
modifier: PotOfCoffee2Go
title: TiddlyWiki5 Backlog Tickets
tags: server
licence: [[MIT Licence]]
icon: $:/poc2go/icon/cloud
toStory: ${opt.toStory}
maxTickets: ${opt.maxTickets}
fuzzy: ${opt.fuzzy}
prefix: ${opt.prefix}
sortBy: ${opt.sortBy}
sortOrder: ${opt.sortOrder}
searchWords: ${opt.searchWords}
foundTickets: ${opt.foundTickets}
shownTickets: ${opt.shownTickets}
shownPage: ${opt.shownPage}
multiWord: ${opt.multiWord}
topicOrder: ${opt.topicOrder}
copyText: Keep a copy

\\define addWord(word)
<$action-listops $field="searchWords" $subfilter=$word$ />
\\end
\\define actions()
<$macrocall $name='poc2go' command=fetch path=tickets />
\\end
\\define clear()
<$action-setfield searchWords=""/>
\\end

<$button actions="<<poc2go 'fetch' 'tickets/Search/Suggest'>>">Topics</$button>
<$button actions="<<poc2go 'fetch' 'tickets/Search/Options'>>">Options</$button>
<$button actions="<<poc2go 'fetch' 'tickets/Search/Usage'>>">Usage</$button>
<$button actions="<<poc2go 'fetch' 'tickets/Search/About'>>"><b>About</b></$button>
<span style="float: right;"><$link to="$:/poc2go/tiddler/socket-status" tooltip="Server Status">{{$:/temp/poc2go/netstat}}</$link></span>

----

<$edit-text field="searchWords" placeholder="Enter word(s) - press 'Search'" size="30" />
<$button class="bttn" actions=<<actions>> >{{$:/core/images/advanced-search-button}} Search</$button>
<$button class="bttn" actions=<<clear>> >{{$:/core/images/paint}} Clear</$button>

!!!About

This tiddler must be loaded from and relies on an [[express|http://expressjs.com/]] server backend using the [[minisearch|https://github.com/lucaong/minisearch/blob/master/README.md]] library to perform the ticket search. Ticket data is gathered once every 24-hours from the GitHub [[TiddlyWiki5|https://github.com/Jermolene/TiddlyWiki5#readme]] issues and pull requests using the [[GitHub REST API|https://docs.github.com/en/rest]] with the results stored on the server.

This wiki must be online to be fully functional - is currrently hosted at https://tw5.poc2go.com. It allows a user to query the TiddlyWiki5 GitHub issue and pull request database and optionally produce a tiddler of search results which can be exported to other wikis, web pages, json, etc.

No server side tracking is implemented. All users are anonymous. Thus sadly, there is no way to keep your last option settings - since not using sessions, cookies, or localstorage.

{{$:/poc2go/ui/footing}}
`;

// ---------------------------------
// Run the fetch issues request
exports.run = (cfg, data) => {
	return tid(data.content.opt);
}

