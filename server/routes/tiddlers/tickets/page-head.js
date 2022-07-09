const { macros } = require('./page-macros');

exports.head = (cfg, opt) => `created: 20220618230816674
modified:	20220618230816674
creator: PotOfCoffee2Go
modifier: PotOfCoffee2Go
title: TiddlyWiki5 Open Tickets
tags: server
licence: [[MIT Licence]]
icon: $:/poc2go/icon/cloud
path: tickets
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

${macros(cfg, opt)}

<$button actions="<<gotoPage Suggest>>">Topics</$button>
<$button actions="<<gotoPage Options>>">Options</$button>
<$button actions="<<gotoPage Usage>>">Usage</$button>
<$button actions="<<gotoPage About>>">About</$button>
<span style="float: right;"><$link to="$:/poc2go/tiddler/socket-status" tooltip="Server Status">{{$:/temp/poc2go/netstat}}</$link> - v${cfg.pkg.version}</span>

----

<$edit-text field="searchWords" placeholder="Enter word(s) - press 'Search'" size="30" />
<$button class="bttn" actions=<<actions>> >{{$:/core/images/advanced-search-button}} Search</$button>
<$button class="bttn" actions=<<clear>> >{{$:/core/images/paint}} Clear</$button>

`;
