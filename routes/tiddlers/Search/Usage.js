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
<$button actions="<<poc2go 'fetch' 'tickets/Search/Usage'>>"><b>Usage</b></$button>
<$button actions="<<poc2go 'fetch' 'tickets/Search/About'>>">About</$button>
<span style="float: right;"><$link to="$:/poc2go/socket/status" tooltip="Server Status">{{$:/temp/poc2go/netstat}}</$link></span>

----

<$edit-text field="searchWords" placeholder="Enter word(s) - press 'Search'" size="30" />
<$button class="bttn" actions=<<actions>> >{{$:/core/images/advanced-search-button}} Search</$button>
<$button class="bttn" actions=<<clear>> >{{$:/core/images/paint}} Clear</$button>

!!!Usage

The
<$button style="transform: scale(.8);" actions="<<poc2go 'fetch' 'tickets/Search/Suggest'>>">Topics</$button>
button displays some common search words pertaining to TiddlyWiki.

Enter a word or words in the textbox then press the <b>'Search'</b> button. Separate each word by a space. The search provides a 'score' based on number of words and hits found in the ticket. That can be used to sort the results.

<div>
  <$select field="sortBy">
  <option>score</option>
  <option>date</option>
  <option>ticket #</option>
  <option># comments</option>
  <option>submitter</option>
  </$select>
  <$select field="sortOrder">
  <option>ascending</option>
  <option>decending</option>
  </$select>
</div>

The top <$select field="maxTickets" >
<option> 1 </option>
<option> 5 </option>
<option> 10 </option>
<option> 20 </option>
<option> 30 </option>
</$select> tickets that match are displayed.

The search results will display a '
<$button class="bttn"><span style={{!!copyStyle}}>{{!!copyButton}}</span> {{!!copyText}} </$button>&nbsp;<$checkbox field="toStory" checked="fetch-tostory" unchecked="fetch" default="fetch"> Open</$checkbox>
' button. Pressing it will create a new tiddler of the search results. If 'Open" checked the tiddler will be displayed, otherwize quietly creates the tiddler. That tiddler can be saved, drag n drop, exported as a web page, more...

By default the search looks for exact matching words. You can search for words that 'begin with' using the '
<$checkbox field="prefix" checked="yes" unchecked="no" default="no"> Prefix </$checkbox>
' option. Is handy for plurals - given the word 'example' would also match 'examples' with the trailing 's'.

The '
<$checkbox field="fuzzy" checked="yes" unchecked="no" default="no"> Fuzzy </$checkbox>
' option handles commonly mispelled words, 'mispelled' would match the correct 'misspelled'.

The search includes only ''open'' tickets that are on the [[TW5 GitHub repository|https://github.com/Jermolene/TiddlyWiki5]]. The title and body are scanned (ie: ticket comments are NOT part of the scan). The server database is updated from GitHub once a day.

Enjoy! - [[PotOfCoffee2Go]]

<details><summary>More...</summary>
<hr style="opacity:.5;">
{{$:/poc2go/tiddler/usage/heading}}
</details>

{{$:/poc2go/tiddler/footing}}
`;

// ---------------------------------
// Run the fetch issues request
exports.run = (cfg, data) => {
	return tid(data.content.opt);
}
