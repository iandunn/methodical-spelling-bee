# v1

- [ ] update counts when new word accepted
	buggy, see notes in main.js

- [ ] bug: blank when first load after deleting local storage

- [ ]  restrict url to just spelling bee page, not all nytiems

- [ ] set ready false to false in prod but true in dev, to make devex smoother
	console.log( process.env.NODE_ENV ); // still says dev even w/ build  files
	or at least set it manually back to false before committing

- [ ] update icon
		make sure svg works - https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/icons#svg
		where does it get used?

- [ ] unit write tests for some functions

- [ ] webext lint (in the dev folder) shows some errors and warnings. some of it may just be from react/webpack/etc though

- [ ] handle scraping errors gracefully b/c assume will change markup etc in future

- [ ] why is upstream source.js saved? what is it? i don't remember

-------------------------------
devex

- [ ] beep when there's a compile error

- [ ] new stylesheet gets added every time, instead of replacing old one? causes bugs

- [ ] auto click on "play/continue" button after reloading page
	only in dev env

- [ ] clear console before hmr updates
	https://github.com/webpack/webpack-dev-server/issues/565#issuecomment-449979431 doesn't work, neither do others in that issue
		that clears after reloading, so don't see errors
	maybe b/c webext is reloading

- [ ] silence the "hmr waiting for update..." msg
	maybe will automatically if get clear() working

- [ ] customize eslint ruleset, default is annoying


-------------------------------

post launch

- [ ] add overall stats
	- [ ] WORDS: x/49
	- [ ] POINTS: x/265
	- [ ] PANGRAMS: x/3
	- [ ] make the dom parsing bit DRY - have a func pull out the 2LL, grid, and stats, then pass to individual funcs to parse
- [ ] add the matrix of start+count, not sure how to show checkbox

-------------------------------

- [ ] keep alphabetical sort, but move completed to bottom of list (still alpha), or separate list
	how does this interact w/ list columns? maybe left column incomplete and right is complete? but not normal to have many fully complete

- [ ] use strictmode
- [ ] setup errorboundary

- [ ] maybe publish to browser directories
	if so, test in chrome first
