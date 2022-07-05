#!/usr/bin/env node
const fs = require('fs');

const githubIssuesFile = './github-issues.json';

// ---------------------------------
// Get data from GitHub
// Get fetch module as commonJS module
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

// Get Personal Access Token from '.env' file
require('dotenv').config({path: '../../.envt'});
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
				process.stdout.write('.');
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
		console.log(`\n${githubissues.length} GitHub Issues written to '${githubIssuesFile}'.`);
	})
};

// ---------------------------------
// Actions
process.stdout.write('Fetching TW5 issues and pull requests ');
requestIssues();
