const { head } = require('./page-head');
const { foot } = require('./page-foot');

const tiddler = (cfg, opt) => `${head(cfg, opt)}

!!!Usage

<hr style="opacity: .5;">
{{$:/poc2go/ui/usage/heading}}

<span style="float: right;"><img src="/assets/images/usage.svg"></span>

The
<$button style="transform: scale(.8);" actions="<<poc2go 'fetch' 'tickets/Suggest'>>">Topics</$button>
button displays some common search words pertaining to TiddlyWiki.

Enter a word or words in the textbox then press the <b>'Search'</b> button. Separate each word by a space. Can combine multiple words with <span style="border: 1px solid currentColor;">&nbsp;&nbsp;
<$radio field="combineWith" value="or" > Or</$radio>&nbsp;or&nbsp;
<$radio field="combineWith" value="and" > And</$radio> </span>&nbsp; on the <$button style="transform: scale(.8);" actions="<<poc2go 'fetch' 'tickets/Options'>>">Options</$button> page.


<img src="/assets/images/ticketlinks.png" width="300" style="float: left; margin-right: 1rem;">
By clicking the ticket number a detail page will open with the Issue or Pull Requst along with any comments pertaining to the ticket.
Pressing the user name refines the search to only include tickets submitted by that user that also matches the search criteria.

<div style="clear: both;" />

The search provides a 'score' based on number of words and hits found in the ticket. That can be used to sort the results
<span>
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
</span>.
The number of tickets returned can be selected <$select field="maxTickets" >
<option> 1 </option>
<option> 5 </option>
<option> 10 </option>
<option> 20 </option>
<option> 30 </option>
</$select> that are the top matching tickets.

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

${foot(cfg, opt)}
`;

// ---------------------------------
// Run the fetch issues request
exports.run = (cfg, data) => {
	return tiddler(cfg, data.content.opt);
}
