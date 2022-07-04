const tid = (opt) => `created:	20220618230816674
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
<$action-listops $$field="searchWords" $subfilter=$word$ />
\\end
\\define actions()
<$macrocall $name='poc2go' command=fetch path=tickets />
\\end
\\define clear()
<$action-setfield $searchWords=""/>
\\end

<$button actions="<<poc2go 'fetch' 'tickets/Search/Suggest'>>">Topics</$button>
<$button actions="<<poc2go 'fetch' 'tickets/Search/Options'>>"><b>Options</b></$button>
<$button actions="<<poc2go 'fetch' 'tickets/Search/Usage'>>">Usage</$button>
<$button actions="<<poc2go 'fetch' 'tickets/Search/About'>>">About</$button>
<span style="float: right;"><$link to="$:/poc2go/tiddler/socket-status" tooltip="Server Status">{{$:/temp/poc2go/netstat}}</$link></span>

----

<$edit-text field="searchWords" placeholder="Enter word(s) - press 'Search'" size="30" />
<$button class="bttn" actions=<<actions>> >{{$:/core/images/advanced-search-button}} Search</$button>
<$button class="bttn" actions=<<clear>> >{{$:/core/images/paint}} Clear</$button>

!!!Options

<div style="float:left; width: 39%;">
Maximum tickets to display
<$select field="maxTickets" >
<option> 1 </option>
<option> 5 </option>
<option> 10 </option>
<option> 20 </option>
<option> 30 </option>
</$select>
<br><br>

Sort by
<$select field="sortBy" >
<option>score</option>
<option>date</option>
<option>ticket #</option>
<option># comments</option>
<option>submitter</option>
</$select>
<$select field="sortOrder" >
<option>ascending</option>
<option>decending</option>
</$select>
<br><br>

Topics order -
<$radio field="topicOrder" value="rank" > Most used</$radio>
<$radio field="topicOrder" value="alpha" > Alphabetic</$radio>
</div>

<div style="float:left; width: 49%;">
<$checkbox field="prefix" checked="yes" unchecked="no" default="no"> Prefix search (so that 'moto' will match 'motorcycle')</$checkbox>
<br>
<$checkbox field="fuzzy" checked="yes" unchecked="no" default="no"> Fuzzy search (mispelled 'ismael' will match 'ishmael')</$checkbox>
<br>
<$checkbox field="toStory" checked="fetch-tostory" unchecked="fetch" default="fetch"> Open tiddler when keeping a copy</$checkbox>
</div>

<div style="clear: both;"></div>

<$button class="bttn" actions="<<poc2go 'fetch' 'tickets/Search/Options' '{ reset: true }'>>" >Reset</$button>

{{$:/poc2go/tiddler/footing}}
`;

// ---------------------------------
// Run the fetch issues request
exports.run = (cfg, data) => {
	return tid(data.content.opt);
}

