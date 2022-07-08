exports.macros = (cfg, opt) => `
\\define addWord(word)
<$action-listops $field="searchWords" $subfilter=$word$ />
\\end
\\define actions()
<$macrocall $name='poc2go' command=fetch path=tickets />
\\end
\\define clear()
<$action-setfield searchWords=""/>
\\end
\\define addWord(word)
<$macrocall $name='poc2go' command=fetch-tostory path=tickets options='{ "searchWords": "$word$" }' />
\\end
\\define orderActions()
<$macrocall $name='poc2go' command=fetch path='tickets/Search/Suggest' />
\\end

`;
