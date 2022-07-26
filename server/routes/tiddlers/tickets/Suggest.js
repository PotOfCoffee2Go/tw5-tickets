const topics = require('../../../../public/assets/db/topics.json');
const { head } = require('./page-head');
const { foot } = require('./page-foot');

const tiddler = (cfg, opt, links) => `${head(cfg, opt)}

!!!Topics

<img style="float: right;" src="https://tw5.poc2go.com/assets/images/wordcloud.png" width="50%" />

Search TiddlyWiki5 issues and pull requests (tickets). Some words you might want to consider:

Order by
<$radio field="topicOrder" value="rank" actions=<<orderActions>> > Most used</$radio>
<$radio field="topicOrder" value="alpha" actions=<<orderActions>> > Alphabetic</$radio>


${links.join('\n')}

${foot(cfg, opt)}
`;

// ---------------------------------
// Run the fetch issues request
exports.run = (cfg, data) => {
	const opt = data.content.opt;
	opt.topicOrder = opt.topicOrder || 'rank';

	const mytopics = topics.slice(); // clone
	if (opt.topicOrder === 'rank') mytopics.sort((a, b) => b.rank - a.rank);
	if (opt.topicOrder === 'alpha') mytopics.sort((a, b) => b.word < a.word ? 1 : -1);

	const links = [];
	mytopics.forEach(topic => {
		links.push(`<$button class="tc-btn-invisible tc-tiddlylink" actions=<<addWord ${topic.word}>> >${topic.word}</$button>`);
	})
	return tiddler(cfg, opt, links);
}

