# v1

- [ ] maybe doesnt keep track of updated stats while not ready?
	when playing w/ kelly the 'found' counts were at 0 when clicked ready button, even though had a bunch of words

- [ ] ready button has grid gap below it, don't really want that
	right now it shares styles w/ the "loaded" container which causes the problem



- [ ] fix todos in main.js

- [ ] get icon working
		make sure svg works - https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/icons#svg
		where does it get used? in about:addons ?


- [ ] webext lint (in the dev folder) shows some errors and warnings. some of it may just be from react/webpack/etc though

- [ ] handle scraping errors gracefully b/c assume will change markup etc in future

- [ ] why is upstream source.js saved? what is it? i don't remember

- [ ] css isn't being applied when running from build folder

- [ ] add to firefox extension directory
- [ ] add to chrome extension directory

-------------------------------
devex


- [ ] clear console on hmr reload
	hmr isn't really working anyway. it refreses but changes in views aren't shown
	maybe have to change the webxr --watch-file to something later?
	or maybe there's conflict between webext reload and webpack hmr?
		if run webext w/ `--no-reload` then nothing is reloaded, so webpack hmr isn't even running?


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

- [ ] do a full reload when needed
	hmr is only working well when css changes
	jsx changes aren't taking effect, have to manually reload
	are js logic changes updating automatically?

	maybe there's conflict between webext reload and webpack hmr?

- [ ] beep when there's a compile error


- [ ] silence the "hmr waiting for update..." msg
	maybe will automatically if get clear() working

- [ ] customize eslint ruleset, default is annoying


-------------------------------

post launch

- [ ] make grid dynamic

- [ ] unit write tests for some functions

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
