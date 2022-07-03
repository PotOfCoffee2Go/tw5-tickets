/*
 * This script is designed to be used in pages displayed in tiddler <iframe>
 * <script src="/assigntw.js"></script>
 */

// Reload pages in tiddler
var refreshIframe = () => {
	parent.document.querySelectorAll('iframe').forEach((frame) => {
		frame.style.visibility = 'hidden';
		frame.src = frame.src;
	})
}

// Global access to $tw when within an iframe
if (!$tw) var $tw = undefined;
if (!$tw && parent && parent.$tw) {
	$tw = parent.$tw;


	onload = () => {
		// Insert TiddlyWiki stylesheet before first stylesheet in iframe's document
		var oHead = document.getElementsByTagName("head")[0];
		var frmStyleSheet = document.getElementsByTagName("style")[0];
		var arrStyleSheets = parent.document.getElementsByTagName("style");
		for (var i = 0; i < arrStyleSheets.length; i++)
				oHead.insertBefore(arrStyleSheets[i].cloneNode(true), frmStyleSheet);
		// Get all iframes in this tiddler and resize height to documents height
		parent.document.querySelectorAll('iframe').forEach((frame) => {
			frame.style.visibility = 'hidden';
			$tw.poc2go.resizeIframe(frame, 32);
			frame.style.visibility = 'visible';
		});
	}

	// Eye candy pointing to $tw.poc2go functions
	poc2go = {
		emit: (evt, content = {}, toStory = false) => $tw.poc2go.socketEmit(evt, content, toStory),
		request: (title, toStory) => $tw.poc2go.tiddler.request(title, toStory),
		fetch: (path, options, toStory) => $tw.poc2go.tiddler.fetch(path, options, toStory),
		send: (title, toStory) => $tw.poc2go.tiddler.send(title, toStory),
	}
	toStory = (toTitle, fromTitle) => $tw.poc2go.toStory(toTitle, fromTitle);
	resizeIframe = (frame) => $tw.poc2go.resizeIframe(frame);
}
