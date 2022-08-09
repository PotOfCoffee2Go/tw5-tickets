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
submitter: ${opt.submitter}
submitterUrl: ${opt.submitterUrl}
submitterButton: ${opt.submitterButton}
combineWith: ${opt.combineWith}
userOrder: ${opt.userOrder}

${macros(cfg, opt)}

<span style="float: right;"><$button class="tc-btn-invisible tc-tiddlylink" actions="<<statusPage>>" tooltip="Server Status">{{$:/temp/poc2go/netstat}}</$button> - v${cfg.pkg.version}</span>
<$button actions="<<gotoPage Suggest>>">Topics</$button>
<$button actions="<<gotoPage Users>>">Users</$button>
<$button actions="<<gotoPage Options>>">Options</$button>
<$button actions="<<gotoPage Usage>>">Usage</$button>
<$button actions="<<gotoPage About>>">About</$button>

<hr style="opacity: .5;">

<$button class="bttn" style={{!!submitterButton}} actions=<<clearUser>> >{{$:/core/images/cancel-button}} {{!!submitter}}</$button>
<$keyboard key="enter" actions=<<actions>>>
	<$edit-text field="searchWords" placeholder="Enter word(s) - press 'Search'" size="22" />
</$keyboard>
<$button class="bttn" actions=<<actions>> >{{$:/core/images/advanced-search-button}} Search</$button>
<$button class="bttn" actions=<<clear>> >{{$:/core/images/paint}} Clear</$button>

`;
