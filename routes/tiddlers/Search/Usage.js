const { head } = require('./page-head');
const { foot } = require('./page-foot');

const tiddler = (cfg, opt) => `${head(cfg, opt)}

!!!Usage

<hr style="opacity: .5;">
{{$:/poc2go/ui/usage/heading}}

<span style="float: right;"><img src="/assets/images/usage.svg"></span>

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

${foot(cfg, opt)}
`;

// ---------------------------------
// Run the fetch issues request
exports.run = (cfg, data) => {
	return tiddler(cfg, data.content.opt);
}
