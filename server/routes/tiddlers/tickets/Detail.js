const tiddler = (cfg, opt) => `title: TiddlyWiki5 Ticket Detail
tags: server Gathering...
licence: [[MIT Licence]]
icon: $:/poc2go/icon/cloud
path: tickets
toStory: ${opt.toStory}

\\define actions()
<$macrocall $name='poc2go' command=fetch path=<<currentTiddler>> />
\\end
\\define gotoPage('page')
<$macrocall $name='poc2go' command=fetch path=<<currentTiddler>>  options='{ "path": "tickets/$page$" }'/>
\\end

<iframe style="display: none;" src="/detail/${opt.ticketNbr}"></iframe>

{{$:/poc2go/ui/footing}}
`;

// ---------------------------------
// Run the fetch issues request
exports.run = (cfg, data, db) => {
	return tiddler(cfg, data.content.opt);
}

