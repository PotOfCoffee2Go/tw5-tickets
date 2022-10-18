const { head } = require('./page-head');
const { foot } = require('./page-foot');

const usersDb = '../../../../public/assets/db/submitter.json';
var users;
try {
	require.resolve(usersDb);
	users = require(usersDb);
} catch(e) {
	users = [];
	console.log(`\x1b[31mTicket database - ${usersDb} does not exist.\x1b[0m`);
	console.log(`\x1b[31mNo users to search! Run 'npm run submitter'\x1b[0m`);
}

console.log(`\x1b[35mDatabase contains ${users.length} users\x1b[0m`);

const buildRows = (sortedUsers) => {
	var userMarkup = '';
	const row = [];
	sortedUsers.forEach((user, idx) => {
		userMarkup += ` <$button class="tc-btn-invisible tc-tiddlylink" actions="""<<addSubmitter ${user.submitter} "${user.url}">>""" tooltip="Issues: ${user.tickets.issues} - Pull Requests: ${user.tickets.pr}">${user.submitter}</$button>&nbsp;-&nbsp;${user.tickets.total} |`;
		if ((idx+1)%4 === 0) {
			row.push('|' + userMarkup);
			userMarkup = '';
		}
	})

	if (userMarkup.length) row.push('| ' + userMarkup);
	return row;
}

const tiddler = (cfg, opt, row) => `${head(cfg, opt)}

<span style="float: right;"><img src="/assets/images/users.png"></span>

!!! Users

Search TiddlyWiki5 user issues and pull requests (tickets).
Mouse over user name for number of open issues and pull requests submitted.

Order by
<$radio field="userOrder" value="rank" actions=<<userOrder>> > Most tickets</$radio>
<$radio field="userOrder" value="alpha" actions=<<userOrder>> > Alphabetic</$radio>

${row.join('\n')}

${foot(cfg, opt)}
`;

// ---------------------------------
// Run the fetch issues request
exports.run = (cfg, data) => {
	const opt = data.content.opt;
	opt.userOrder = opt.userOrder || 'rank';

	const myusers = users.slice(); // clone
	if (opt.userOrder === 'rank') myusers.sort((a, b) => b.tickets.total - a.tickets.total);
	if (opt.userOrder === 'alpha') myusers.sort((a, b) => b.submitter.toUpperCase() < a.submitter.toUpperCase() ? 1 : -1);

	return tiddler(cfg, opt, buildRows(myusers));
}

