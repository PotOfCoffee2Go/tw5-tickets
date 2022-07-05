var topics = require('./topics.json');

const tid = (cfg, opt, links) => `created: 20220618230816674
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
copyType: ${opt.copyType}
copyText: Keep a copy

\\define appendWord(word)
<$action-listops $field="searchWords" $subfilter=$word$ />
\\end
\\define replaceWord(word)
<$action-setfield searchWords=$word$ />
\\end
\\define addWord(word)
<<replaceWord $word$>>
<$action-navigate $to="TiddlyWiki5 Backlog Tickets" />
\\end
\\define actions()
<$macrocall $name='poc2go' command=fetch path=tickets />
\\end
\\define orderActions()
<$macrocall $name='poc2go' command=fetch path='tickets/Search/Suggest' />
\\end
\\define clear()
<$action-setfield searchWords="" />
\\end

<$button actions="<<poc2go 'fetch' 'tickets/Search/Suggest'>>"><b>Topics</b></$button>
<$button actions="<<poc2go 'fetch' 'tickets/Search/Options'>>">Options</$button>
<$button actions="<<poc2go 'fetch' 'tickets/Search/Usage'>>">Usage</$button>
<$button actions="<<poc2go 'fetch' 'tickets/Search/About'>>">About</$button>
<span style="float: right;"><$link to="$:/poc2go/tiddler/socket-status" tooltip="Server Status">{{$:/temp/poc2go/netstat}}</$link> - v${cfg.pkg.version}</span>

----

<$edit-text field="searchWords" placeholder="Enter word(s) - press 'Search'" size="30" />
<$button class="bttn" actions=<<actions>> >{{$:/core/images/advanced-search-button}} Search</$button>
<$button class="bttn" actions=<<clear>> >{{$:/core/images/paint}} Clear</$button>

!!!Topics

<img style="float: right;" src="https://tw5.poc2go.com/assets/images/wordcloud.png" width="50%" />

Search TiddlyWiki5 issues and pull requests (tickets). Some words you might want to consider:

Order by
<$radio field="topicOrder" value="rank" actions=<<orderActions>> > Most used</$radio>
<$radio field="topicOrder" value="alpha" actions=<<orderActions>> > Alphabetic</$radio>


${links.join('\n')}

{{$:/poc2go/ui/footing}}
`;

// ---------------------------------
// Run the fetch issues request
exports.run = (cfg, data) => {
  const opt = data.content.opt;
  opt.topicOrder = opt.topicOrder || 'rank';

  if (opt.topicOrder === 'rank') topics.sort((a, b) => b.rank - a.rank);
  if (opt.topicOrder === 'alpha') topics.sort((a, b) => b.word < a.word ? 1 : -1);

  const links = [];
  topics.forEach(topic => {
    links.push(`<$button class="tc-btn-invisible tc-tiddlylink" actions=<<addWord ${topic.word}>> >${topic.word}</$button>`);
  })
	return tid(cfg, opt, links);
}

