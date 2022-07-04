/*\
 * This code was in the
 *   public/tiddlers/poc2go/macros/poc2go.js macro
 * Creates a socket log tiddler. Haandy for
 * dev but not so much in production
\*/

// Log socket info to a tiddler using wikitext
const socketLog = (text) => {
	// Timestamp the text
	text = $tw.poc2go.tStamp() + text;

	// Begin wikitext code block including new text to be added to log
	let logs = ['```', text];

	// Get previous text already in the log
	let curLog = $tw.wiki.getTiddlerText('Socket Log');
	let logLines = curLog ? curLog.split('\n') : [];

	// Limit to the most recent 25 text messages
	let nbrLines = logLines.length < 25 ? logLines.length : 25;
	for (let i = 0; i < nbrLines; i++) {
		if (!/^```/.test(logLines[i])) logs.push(logLines[i]);
	}
	// End the code block
	logs.push('```');

	// Create/update the Socket Log tiddler
	let body = {
		title: 'Socket Log',
		text: logs.join('\n'),
		socketEvent: 'Socket Log'
	}
	$tw.poc2go.tiddler.construct(body);
}

