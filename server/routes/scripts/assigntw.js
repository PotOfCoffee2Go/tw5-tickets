/*
 * This script is designed to be used in pages displayed in tiddler <iframe>
 * <script src="/assigntw.js"></script>
 *
 * Iframe will normally have a script with :
	poc2go.twSheets(); // Load tiddlywiki style sheets into document
	onload = () => {
		... do something ...
		poc2go.onload(); // load the iframe content into tiddler
	}
 */

// Global access to $tw when within an iframe
if (!$tw) var $tw = undefined;
if (!$tw && parent && parent.$tw) {
	$tw = parent.$tw;

	// Eye candy pointing to $tw.poc2go functions
	poc2go = {
		emit: (evt, content = {}, toStory = false) => $tw.poc2go.socketEmit(evt, content, toStory),
		request: (title, toStory) => $tw.poc2go.tiddler.request(title, toStory),
		fetch: (path, options, toStory) => $tw.poc2go.tiddler.fetch(path, options, toStory),
		send: (title, toStory) => $tw.poc2go.tiddler.send(title, toStory),
		construct: (body, toStory = false) => $tw.poc2go.tiddler.construct(body, toStory),

		// call at end of page's 'onload' function to load TW styles and auto size
		onload: () => {
			// Insert TiddlyWiki stylesheet before first stylesheet in iframe's document
			var oHead = document.getElementsByTagName("head")[0];
			var frmStyleSheet = document.getElementsByTagName("style")[0];
			var arrStyleSheets = parent.document.getElementsByTagName("style");
			for (var i = 0; i < arrStyleSheets.length; i++) {
				oHead.insertBefore(arrStyleSheets[i].cloneNode(true), frmStyleSheet);
			}
			// hack to get foreground color from parent
			document.body.style.color = parent.window.getComputedStyle( parent.document.body ,null).getPropertyValue('color');
			// Get all iframes in this tiddler and resize height to documents height
			parent.document.querySelectorAll('iframe').forEach((frame) => {
				frame.style.visibility = 'hidden';
				$tw.poc2go.resizeIframe(frame, 32);
				frame.style.visibility = 'visible';
			});
		},
	}
	toStory = (toTitle, fromTitle) => $tw.poc2go.toStory(toTitle, fromTitle);
	resizeIframe = (frame) => $tw.poc2go.resizeIframe(frame);
}
