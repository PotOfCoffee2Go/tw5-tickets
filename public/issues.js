#!/usr/bin/env node
const fs = require('fs');

const githubIssuesFile = './github-issues.json';
var data = require(githubIssuesFile);
console.log(`Open tickets ${data.length}`);

// issue--------->(ticket)-->--------------------->goals->roadmap
// pull request-^         |->----------->project-^   |       |
//      ^                 |->milestone-^---------^   |       |
//      |                                            |       |
//      ------------------------------------------------------

// GitHub considers an issue and pull request to be different even though
//  contains the same fields
// A 'ticket' is used to describe both issues and pull requests as a single term.


// The follow fields are maintained on the ticket record.
// State - 'open', 'closed'
// Status - 'New', 'Backlog', 'Ready', 'In progress', 'On hold', 'In review', 'Done'

// Labels - 'Bug', 'Idea', 'Question', 'Proposal', 'Docs', 'Feature', 'Enhancement'
// Actions - 'Discuss', 'Assign', 'Help wanted', 'Good first issue',
// Reasons - 'Completed', 'Invalid', 'Duplicate', 'Wontfix'
// Size - 'X-large', 'Large', 'Medium', 'Small', 'Tiny'


/*

 * Issue/PR entered into system -  (auto) State 'open', Status 'New', Action 'Discuss'
 * Discuss -
   * set Labels
   * State to 'closed'? - Status 'Done', set Reason
   * State still 'open' - move Status from 'New'
     * Status 'Backlog'? - setting other fields would be handy
     * Status 'On hold'? - can be set anytime - has a blocking issue
     * Status 'Ready'?
       * Set priority, repository, size, milestone
       * Assign reviewers
     * Status 'In progress'?
       * Verify reviewers, priority, repository, size, milestone
       * Assign assignee(s)
     * Status 'In review'?
       * review/verify ticket complete
       * possibly merge - if so set State 'closed'
       * set Status 'Done' - Reason 'Completed'

Notice that none of these settings include a 'project'. On GitHub a project is just a
view into a collection of related tickets added to the project. They are created at
user or organization level. This allows a users to maintain there own projects
of same tickets indepentently from the organization. The fields stored in tickets are
used to update projects containing the ticket.

sorting and filtering based on the fields. For example
can display tickets by reviewer, repository, or priority.

Projects are normally created bottom-up or top-down. Bottom-up organizes similar
tickets that are in 'Backlog' or 'On-hold' into a set of projects. As an idea
by TiddlyWiki component - 'boot', 'core', 'edition', 'plugin', 'library',
'rule', 'savers', etc. Top-down projects usually come from future direction,
goals, and roadmap. Tickets are generated to accomplish the projects.

Projects can require many hours of work to be completed - in some cases a project
remains open ended. Projects are broken down by milestones. A milestone is a way to gauge the current
progress of the project. Generally, project maintainers lay out project milestones
as a series or sequence of high level tasks. Tickets are assigned to the milestones.

A single ticket or milestone can be in more than one project. As the fields in a ticket
are updated, those projects will update to represent the current status of that ticket and
milestone. However, a ticket can only be assigned to a single milestone.

At any time:
 * discussion, comments, freeform check box tasks, etc
 * milestone and/or project assigned to ticket
 * assigned
 * work performed


 * referenced in a Pull Request - finalize milestone (v5.x.x.x)


*/


const roadmaps = [];

const milestones = [
	'build', 'pre-release', 'release', 'hotfix', 'classic', 'major'
];

// Fields
const ticket = {
	nodeId: '',      // issue database reference number
	number: 0,       // issues refernce number
	submitter: '',   // login of user submitting ticket
	status: '',      // new, backlog, ready, in-progress, review, done
	reviewers: [],   // persons reviewing ticket
	assignees: [],   // persons implementing ticket
	labels: [],      // categories which the ticket is assigned
	projects: [],    // projects which include the ticket
	milestone: '',   // roadmap milestone
	development: '', // workflow actions
};


const twlabels = [
	// Primary labels
	'IDEA', 'BUG', 'PROPOSAL', 'DOCS', 'FEATURE', 'ENHANCEMENT',
	// Secondary labels
	'boot', 'core', 'edition', 'plugin', 'library',
	'rule', 'webserver', 'saver', 'deserializer',
	'nodejs', 'cli', 'popup', 'error', 'widget',
	'module', 'parser', 'transclusion', 'wikitext',
	'config', 'button', 'filter', 'images', 'macro',
	'data', 'json', 'upgrader', 'documentation',
	'pragma', 'editor', 'tags', 'language', 'palette', 'state',
	'sidebar', 'theme', 'keyboard', 'settings', 'template',
	'toolbar', 'command', 'operator', 'indexer', 'route',
	'startup', 'storyview', 'field', 'utils', 'UI',
	'links', 'backlinks', 'missing', 'orphans',
	'classic',
];

// ---------------------------------
// Build submitter information
const submitters = {};
data.forEach(issue => {
	// Add new user to submitter list
	if (!submitters[issue.user.login]) {
		submitters[issue.user.login] = {total: 0, pr: 0, issues: 0};
	}
	// Update with ticket counts
	submitters[issue.user.login].total++
	if (issue.pull_request) {
		submitters[issue.user.login].pr++;
	} else {
		submitters[issue.user.login].issues++;
	}
});

// ---------------------------------
// Users submitting to Ticket system
const ticketSubmitters = () => {
	const users = [];
	for (const [submitter, tickets] of Object.entries(submitters)) {
		users.push({ submitter: submitter, tickets });
	}
	users.sort((a, b) => b.tickets.total - a.tickets.total);
	console.log(`Number of submitters ${users.length}`);
	users.forEach((submitter) => console.log(submitter));
};

// ---------------------------------
// Submitter, title and body of tickets
const ticketSummary = () => {
	const tickets = [];
	data.forEach(ticket => {
		tickets.push({number: ticket.number, submitter: ticket.user.login, title: ticket.title, body: ticket.body});
	})
	tickets.forEach(ticket => console.log(ticket));
};


// ---------------------------------
// Get data from GitHub
// Get fetch module as commonJS module
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

// Get Personal Access Token from '.env' file
require('dotenv').config({path: '../.env'});
const TOKEN = process.env.TOKEN;

// Set fetch header options
const githubopts = {
	headers: {
		'Accept': 'application/vnd.github.v3+json',
		'Authorization': `token ${TOKEN}`
	},
};

// Link to GitHub issues by page
const githubLink = (pagenbr) => `/repos/Jermolene/TiddlyWiki5/issues?page=${pagenbr}&per_page=100`;

// Collect all open GitHub issues
const githubissues = [];
const requestIssues = (pagenbr = 1) => {
	// Fetch and process the feed
	fetch(`https://api.github.com${githubLink(pagenbr)}`, githubopts)
		.then((res) => {
			if (res.status !== 200) {
				throw new Error(`Fetch GitHub issues HTTP error - status: ${res.status}`);
			} else {
				return res.json()
			}
		})
		.then((json) => {
			// Build the ticket database
			json.forEach((issue) => {
				// todo: any processing of issue
				githubissues.push(issue);
			})
			// Keep fetching open issues until last (an empty) page
			if (json.length) {
				setTimeout(() => requestIssues(pagenbr + 1), 1000);
			} else {
				writeIssues();
			}
		})
}

// Write github issues to file
const writeIssues = () => {
	fs.writeFile(githubIssuesFile, JSON.stringify(githubissues, null, 2), (err) => {
		if (err) {
			console.log('Write of GitHub issues error!');
			throw err;
		}
		console.log(`${githubissues.length} GitHub Issues written to '${githubIssuesFile}'.`);
	})
};

// ---------------------------------
// Search tickets
const ticketSearch = () => {
	const MiniSearch = require('minisearch');

	let miniSearch = new MiniSearch({
		fields: ['title', 'body'], // fields to index for full-text search
		storeFields: ['number', 'title'] // fields to return with search results
	})

	// Index all documents
	miniSearch.addAll(data)

	// Search with default options
	let results = miniSearch.search('boot core edition plugin')
	results.forEach(rec => console.log(rec.number, rec.score, rec.match));
}



// ---------------------------------
// Actions
//ticketSearch();
//ticketSubmitters();
//ticketSummary();
requestIssues();
