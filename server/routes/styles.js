// Styles are inserted into page templates by Mustache.js

module.exports = {
// Theme inserted into all pages
theme: `
<style>
	* {
		box-sizing: border-box;
	}

	html, body {
		font-family: Arial, sans-serif;
		font-size: 14px;
		background: transparent; /* #262b33; */
		color: #fbf1c7;
		scroll-behavior: smooth;
	}

	p { background: #383e49; }

	input[type="text"], textarea {
		color: currentColor;
		background: #262b33;
		border: 1px solid currentColor;
		border-color: currentColor;
		position: relative;
	}

	input[type="button"], button, span.bttn, a.bttn {
		font-family: Arial, sans-serif;
		text-align: center;
		border: 1px solid currentcolor;
		padding: 2px 4px;
		border-radius: 6px;
		margin: 0 .25rem;
		cursor: pointer;
	}

	span.mo { color: aliceblue; cursor: pointer;} /* mouse over span */
	span:hover.mo, span:hover.bttn, a:hover.bttn { color: lightgreen; } /* mouse over span */

	a:link { color: aliceblue; } /* unvisited link */
	a:visited { color: aliceblue; } /* visited link */
	a:hover { color: lightgreen; } /* mouse over link */
	/* a:active { color: blue; }   selected link */

	.collapsible {
		overflow: hidden;
		transition: all 0.5s ease-in-out;
	}
	.collapsible.collapsed {
		height: 0;
	}
</style>
`,

// Styles for the home page
tree: `
<style>
html, body {
 font-family : ariel, monospace, sans-serif;
 line-height: .95rem;
	background-image: url('/assets/images/sunset-1634374_640_dark.jpg');
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-size: cover;
	overflow: hidden; /* Hide scrollbars */
	color: #fe952a;
	margin-left: 20px;
}
.left-div {
	float: left;
}
.right-div {
	float: right;
	width: 70%;
	margin-top: 3rem;
	color: aquamarine;
}

P { font-weight: normal; font-family : ariel, monospace, sans-serif; color: white; background-color: transparent;}
B { font-weight: normal; color: white; background-color: transparent;}
A:visited { font-weight : normal; text-decoration : none; background-color : transparent; margin : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }
A:link    { font-weight : normal; text-decoration : none; margin : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }
A:hover   { color : #000000; font-weight : normal; text-decoration : underline; background-color : yellow; margin : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }
A:active  { color : #000000; font-weight: normal; background-color : transparent; margin : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }
.VERSION { font-size: small; font-family : arial, sans-serif; }
.NORM  { color: yellow;  background-color: transparent;}
.FIFO  { color: purple; background-color: transparent;}
.CHAR  { color: blue; background-color: transparent;}
.DIR   { color: yellow; background-color: transparent;}
.BLOCK { color: yellow; background-color: transparent;}
.LINK  { color: aqua;   background-color: transparent;}
.SOCK  { color: fuchsia;background-color: transparent;}
.EXEC  { color: green;  background-color: transparent;}

.top-text {
	padding-top: 2em;
	padding-left: 40%;
}
.bottom-text {
	padding-left: 28%;
}
.footer-text {
	text-align: center;
}
</style>
`,

// Styles for the tiddlers Directory page
tiddlersdir: `
<style>
	a.bttn {
		text-decoration: none;
		border: none;
	}
	a.bttn:hover, a.bttn:visited, a.bttn:focus, a.bttn:active {
		text-decoration: none;
	}
</style>
`,
// Styles for the TW directory page
directory: `
<style>

	html, body {
		overflow: hidden;
	}
	.filter {
		margin-bottom: 1rem;
	}
	.filter input[type="text"] {
	 width: 100px;
	}

	#directory {
		margin-bottom: .5rem;
	}

	textarea,
	input[name="passphrase"] {
		 width: 100%;
	}

	table {
		font-family: 'Courier New', monospace;
	}
	th {
		min-width: 110px;
		font-weight: normal;
	}

	#folders table th, #listing table th {
		border-bottom: 1px solid currentColor;
	}
	#folders table, #listing table {
		border-bottom: 1px solid currentColor;
	}
	#folders table {
		margin-bottom: .5rem;
	}

	#listing table td:nth-child(1) {
		font-size: .8rem;
		text-align: end;
	}

	#fileNameSpan {
		font-family: 'Courier New', monospace;
	}
	#submitSpan {
		margin-left: 1em;
	}

	.information table {
		border: 1px solid currentColor;
		border-collapse: collapse;
	}

	div.information {
		margin-top: 1rem;
	}

	.information table tr td {
		border: 1px solid currentColor;
	}

	.information table tr th { text-align: center; }
	#summary-table table td:nth-child(2) { text-align: end; }
	#authors-table table td:nth-child(2) { text-align: end; }
	#tags-table table td:nth-child(2) { text-align: end; }

	.dirtext {
		color: lightblue;
		cursor: pointer;
		text-decoration: underline;
	}
	.dirtext:hover { color: lightgreen; }

	.filterOn { color: lightgreen; }
	.noResult { color: hotpink; }
</style>
`,

// Styles for the TW developer page
developer: `
	<style>
	body {
		line-height: 1.5rem;
		background-image: url('/assets/images/month-4076018_1280-dark.jpg');
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-size: cover;
	}

	.container {
		width: 100%;
		height: 100%;
	}

/*
	.container {
		border: 1px solid red;
	}
	.left-text {
		border: 1px solid green;
	}
	.middle-text {
		border: 1px solid blue;
	}
	.right-text {
		border: 1px solid yellow;
	}
*/
	.top-text {
		width: 100%;
		height: 33%;
	}

	.left-text {
		padding-top: 2em;
		width: 53%;
		height: 100%;
		float: left;
	}
	.middle-text {
		width: 33%;
		height: 100%;
		float: left;
	}
	.right-text {
		width: 14%;
		height: 100%;
		float: right;
	}
	.footer-container {
		clear: both;
		width: 100%;
		height: 100%;
		text-align: center;
	}
	.footer-text {
	}
</style>
`,
}
