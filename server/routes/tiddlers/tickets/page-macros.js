exports.macros = (cfg, opt) => `
\\define actions()
<$macrocall $name='poc2go' command=fetch path=<<currentTiddler>> />
\\end
\\define gotoPage('page')
<$macrocall $name='poc2go' command=fetch path=<<currentTiddler>>  options='{ "path": "tickets/$page$" }'/>
\\end
\\define clear()
<$action-setfield searchWords=""/>
<$action-setfield submitter="" />
<$action-setfield submitterUrl="" />
<$action-setfield submitterButton="display: none;" />
\\end
\\define clearUser()
<$action-setfield submitter="" />
<$action-setfield submitterUrl="" />
<$action-setfield submitterButton="display: none;" />
\\end
\\define addWord(word)
<$macrocall $name='poc2go' command=fetch path=<<currentTiddler>> options='{"path": "tickets", "searchWords": "$word$" }' />
\\end
\\define orderActions()
<$macrocall $name='poc2go' command=fetch path=<<currentTiddler>> options='{"path": "tickets/Suggest"}' />
\\end
\\define userOrder()
<$macrocall $name='poc2go' command=fetch path=<<currentTiddler>> options='{"path": "tickets/Users"}' />
\\end
\\define statusPage()
<$macrocall $name='poc2go' command=request-tostory path="poc2go/app/socket-status.tid" />
\\end
\\define selectUser(user url)
<$action-setfield submitter="$user$"/>
<$action-setfield submitterUrl="$url$"/>
<$action-setfield submitterButton="" />
<$action-navigate $to=<<currentTiddler>>/>
\\end

`;
