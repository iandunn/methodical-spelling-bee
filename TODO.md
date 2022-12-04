# v1

- [ ] make grid dynamic

- [ ] fix todos in main.js



- [ ] update icon
		make sure svg works - https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/icons#svg
		where does it get used?

- [ ] unit write tests for some functions

- [ ] webext lint (in the dev folder) shows some errors and warnings. some of it may just be from react/webpack/etc though

- [ ] handle scraping errors gracefully b/c assume will change markup etc in future

- [ ] why is upstream source.js saved? what is it? i don't remember

- [ ] css isn't being applied when running from build folder

-------------------------------
devex

- [ ] clear console on hmr reload
	hmr isn't really working anyway. it refreses but changes in views aren't shown
	maybe have to change the webxr --watch-file to something later?
	or maybe there's conflict between wxr reload and webpack hmr?

		// can't get working
	//if ( module.hot ) {
	//	module.hot.accept(); // already had this init code
	//
	//	module.hot.addStatusHandler( status => {
	//		console.log( 'prep2', status );
	//
	//		if ( status === 'prepare' ) {
	//			console.clear();
	//		}
	//	} );
	//}

	//window.addEventListener( 'message', function onWebpackMessage( event ) {
	//	if ( true === event.data?.hello ) {
	//		return;
	//	}
	//
	//	console.log('before 8');
	//	console.log( JSON.parse( event.data ) );
	//	//console.clear();
	//	console.log('after2');
	//} );
	//console.log( '-------------------------------' ); // this happens after, but i want it to happen before


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

- [ ]  restrict url to just spelling bee page, not all nytiems

- [ ] add support for BINGO, # of perfect pangrams, etc in the stats

- [ ] add the matrix of start+count, not sure how to show checkbox

-------------------------------

- [ ] keep alphabetical sort, but move completed to bottom of list (still alpha), or separate list
	how does this interact w/ list columns? maybe left column incomplete and right is complete? but not normal to have many fully complete

- [ ] use strictmode
- [ ] setup errorboundary

- [ ] maybe publish to browser directories
	if so, test in chrome first
