const { head } = require('./page-head');
const { foot } = require('./page-foot');

const tiddler = (cfg, opt) => `${head(cfg, opt)}

<span style="float: right;"><img src="/assets/images/options.svg"></span>

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

Topics order:
<$radio field="topicOrder" value="rank" > Most used&nbsp;&nbsp;</$radio>
<$radio field="topicOrder" value="alpha" > Alphabetic</$radio>
<br>
Users order:
<$radio field="userOrder" value="rank" > Most tickets</$radio>
<$radio field="userOrder" value="alpha" > Alphabetic</$radio>
</div>

<div style="float:left; width: 49%;">
Combine multiple words with:&nbsp;&nbsp;
<$radio field="combineWith" value="or" > Or</$radio>&nbsp;&nbsp;
<$radio field="combineWith" value="and" > And</$radio>
<br><br>
<$checkbox field="prefix" checked="yes" unchecked="no" default="no"> Prefix search (so that 'moto' will match 'motorcycle')</$checkbox>
<br>
<$checkbox field="fuzzy" checked="yes" unchecked="no" default="no"> Fuzzy search (mispelled 'ismael' will match 'ishmael')</$checkbox>
<br>
<$checkbox field="copyType" checked="application/json" unchecked="text/vnd.tiddlywiki" default="text/vnd.tiddlywiki"> Json (format Keep a copy as JSON)</$checkbox>
<br>
<$checkbox field="toStory" checked="fetch-tostory" unchecked="fetch" default="fetch"> Open tiddler when keeping a copy</$checkbox>
</div>

<div style="clear: both;"></div>

<$button class="bttn" actions="<<poc2go 'fetch' 'tickets/Options' '{ reset: true }'>>" >Reset</$button>

${foot(cfg, opt)}
`;

// ---------------------------------
// Run the fetch issues request
exports.run = (cfg, data) => {
	return tiddler(cfg, data.content.opt);
}

