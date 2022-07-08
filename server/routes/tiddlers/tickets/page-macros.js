exports.macros = (cfg, opt) => `
\\define actions()
<$macrocall $name='poc2go' command=fetch path=<<currentTiddler>> />
\\end
\\define gotoPage('page')
<$macrocall $name='poc2go' command=fetch path=<<currentTiddler>>  options='{ "path": "tickets/$page$" }'/>
\\end
\\define clear()
<$action-setfield searchWords=""/>
\\end
\\define addWord(word)
<$macrocall $name='poc2go' command=fetch-tostory path=<<currentTiddler>> options='{"path": "tickets", "searchWords": "$word$" }' />
\\end
\\define orderActions()
<$macrocall $name='poc2go' command=fetch path=<<currentTiddler>> options='{"path": "tickets/Suggest"}' />
\\end

`;
