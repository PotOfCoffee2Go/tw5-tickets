const copyTiddler = (search) =>
`title: Search TW5 Tickets - ${search.opt.searchWords}
caption: TW5 Tickets - ${search.opt.searchWords}
searchWords: ${search.opt.searchWords}
tags: TW5 tickets ${search.opt.searchWords.split(' ').join('-')}
license: [[MIT Licence]]
icon: $:/core/images/export-button
path: ${search.opt.path}
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
submitter: ${search.opt.submitter}
submitterUrl: ${search.opt.submitterUrl}
combineWith: ${search.opt.combineWith}
type: ${search.opt.copyType}

`;

const workingTiddler = (cfg, search) =>
`title: TiddlyWiki5 Open Tickets
searchWords: ${search.opt.searchWords}
tags: server
license: [[MIT Licence]]
icon: $:/poc2go/icon/cloud
path: ${search.opt.path}
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
submitter: ${search.opt.submitter}
submitterUrl: ${search.opt.submitterUrl}
submitterButton: ${search.opt.submitterButton}
combineWith: ${search.opt.combineWith}
userOrder: ${search.opt.userOrder}

\\define actions()
<$macrocall $name='poc2go' command=fetch path=<<currentTiddler>> />
\\end
\\define gotoPage('page')
<$macrocall $name='poc2go' command=fetch path=<<currentTiddler>>  options='{ "path": "tickets/$page$" }'/>
\\end
\\define copySearch()
<$macrocall $name='poc2go' command={{!!toStory}} path=<<currentTiddler>> options='{ "path": "ticketscopy" }' />
<$action-setfield copyButton="{{$:/core/images/done-button}}" />
<$action-setfield copyStyle="border-radius: 4px;fill: black;background:rgb(204, 204, 255);" />
<$action-setfield copyText="Copied to tiddler" />
\\end
\\define clear()
<$action-setfield searchWords="" />
<$action-setfield submitter="" />
<$action-setfield submitterUrl="" />
<$action-setfield submitterButton="display: none;" />
\\end
\\define clearUser()
<$action-setfield submitter="" />
<$action-setfield submitterUrl="" />
<$action-setfield submitterButton="display: none;" />
\\end
\\define addSubmitter(user url)
<$macrocall $name='poc2go' command=fetch-tostory path=<<currentTiddler>>
options='{"path": "tickets", "submitter": "$user$", "submitterUrl": "$url$", "submitterButton": "" }' />
\\end
\\define removeSubmitter()
<$macrocall $name='poc2go' command=fetch path=<<currentTiddler>>
options='{"path": "tickets", "submitter": "", "submitterUrl": "", "submitterButton": "display: none;" }' />
\\end
\\define statusPage()
<$macrocall $name='poc2go' command=request-tostory path="poc2go/app/socket-status.tid" />
\\end

<span style="float: right;"><$button class="tc-btn-invisible tc-tiddlylink" actions="<<statusPage>>" tooltip="Server Status">{{$:/temp/poc2go/netstat}}</$button> - v${cfg.pkg.version}</span>
<$button actions="<<gotoPage Suggest>>">Topics</$button>
<$button actions="<<gotoPage Users>>">Users</$button>
<$button actions="<<gotoPage Options>>">Options</$button>
<$button actions="<<gotoPage Usage>>">Usage</$button>
<$button actions="<<gotoPage About>>">About</$button>

<hr style="opacity: .5;">

<span style="float: left;">
<$button class="bttn" style={{!!submitterButton}} actions=<<removeSubmitter>> >{{$:/core/images/cancel-button}} {{!!submitter}}</$button>
<$keyboard key="enter" actions=<<actions>>>
	<$edit-text field="searchWords" placeholder="Enter word(s) - press 'Search'" size="22" />
</$keyboard>
<$button class="bttn" actions=<<actions>> >{{$:/core/images/advanced-search-button}} Search</$button>
<$button class="bttn" actions=<<clear>> >{{$:/core/images/paint}} Clear</$button>
</span>

<span style="margin-top: .5em;float: right;">
<$button class="bttn" actions="<<copySearch>>"><span style={{!!copyStyle}}>{{!!copyButton}}</span> {{!!copyText}} </$button>&nbsp;
<$checkbox field="toStory" checked="fetch-tostory" unchecked="fetch" default="fetch"> Open</$checkbox>
&nbsp;<$checkbox field="copyType" checked="application/json" unchecked="text/vnd.tiddlywiki" default="text/vnd.tiddlywiki"> Json&nbsp;</$checkbox>
</span>

<div style="clear: both;padding-top: .5rem;">
	<span style="margin-left: 10%;">
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
</div>
<div style="clear: both;"></div>
<hr style="opacity: .5;">

<b>TW5 Ticket Search</b>`;

// ---------------------------------
// Tickets Search Tiddler
const contentTiddler = (search) => ` showing ${search.opt.shownTickets} of ${search.opt.foundTickets} open tickets ${search.opt.searchWords ? "matching &quot;"+search.opt.searchWords.replace(/ /g, '&quot; '+search.opt.combineWith+' &quot;')+"&quot;" : ''}
sorted by ${search.opt.sortBy}&nbsp;${search.opt.sortOrder}
on <$view field=fetched format=date template="DDth mmm YYYY at 0hh:0mm:0ss" /> - from the tickets submitted by ${search.opt.submitter ? "'"+search.opt.submitter+"'" : 'all users'}.

${search.titles}

`;
// Tickets Search JSON Tiddler
const jsonTiddler = (search) => `${search.json}
`;

// When no submitter or words requested
const nothingRequested = () => `
 - No search criteria has been requested.

Enter words to search or can select some commonly used words from the
<$button style="transform: scale(.8);" actions="<<poc2go 'fetch' 'tickets/Suggest'>>">Topics</$button>
page.
You can also select a submitter from the
<$button style="transform: scale(.8);" actions="<<poc2go 'fetch' 'tickets/Users'>>">Users</$button>
page to see tickets submitted
by a GitHub user. If enter both, then will search for tickets matching those submitted
by the user which also includes those topics.
<$button class="bttn" actions="""<<poc2go 'fetch-tostory' 'tickets/Detail' '{"ticketNbr": "6855"}'>>""">Detail</$button>

`;

const contentFooting = () => `
{{$:/poc2go/ui/footing}}
`;

module.exports = {
  copyTiddler: copyTiddler,
  workingTiddler: workingTiddler,
  contentTiddler: contentTiddler,
  jsonTiddler: jsonTiddler,
  nothingRequested: nothingRequested,
  contentFooting: contentFooting,
}
