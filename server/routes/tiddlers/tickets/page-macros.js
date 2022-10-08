exports.macros = (cfg, opt) => `
\\define actions()
<$macrocall $name='poc2go' command=fetch path=<<currentTiddler>> />
\\end
\\define gotoPage('page')
<$macrocall $name='poc2go' command=fetch path=<<currentTiddler>>  options='{ "path": "tickets/$page$" }'/>
\\end
\\define gotoDetail()
<$macrocall $name='poc2go' command=fetch-tostory path=<<currentTiddler>> options='{ "path": "tickets/Detail" }'/>
\\end
\\define clear()
<$action-setfield searchWords=""/>
<$action-setfield ticketNbr="" />
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
\\define addSubmitter(user url)
<$macrocall $name='poc2go' command=fetch path=<<currentTiddler>>
options='{"path": "tickets", "submitter": "$user$", "submitterUrl": "$url$", "submitterButton": "" }' />
\\end
\\define orderActions()
<$macrocall $name='poc2go' command=fetch path=<<currentTiddler>> options='{"path": "tickets/Suggest"}' />
\\end
\\define userOrder()
<$macrocall $name='poc2go' command=fetch path=<<currentTiddler>> options='{"path": "tickets/Users"}' />
\\end
\\define statusPage()
<$macrocall $name='poc2go' command=request-tostory path="poc2go/assets/socket-status.tid" />
\\end
\\define selectUser(user url)
<$action-setfield submitter="$user$"/>
<$action-setfield submitterUrl="$url$"/>
<$action-setfield submitterButton="" />
<$action-navigate $to=<<currentTiddler>>/>
\\end

`;
