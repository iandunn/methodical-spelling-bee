import React                     from 'react';
import { render }                from 'react-dom';
import { MethodicalSpellingBee } from './main';

const statusBox    = document.querySelector( '.sb-status-box' );
const msbContainer = document.querySelector( '#methodical-spelling-bee' ); // rename to more descriptive, but still need to distinguish from nytimes elements

if ( null !== statusBox && null === msbContainer ) {
	statusBox.insertAdjacentHTML( 'beforeend', '<div id="methodical-spelling-bee"></div>' );
}

// need to wait until after click play/continue to render? otherwise sometimes creates errors?
render(
	<MethodicalSpellingBee />,
	document.querySelector( '#methodical-spelling-bee' )
);

if ( true ) { // detect webext reload
	//console.clear();
	console.log( '-------------------------------' ); // this happens after, but i want it to happen before
	// so prob have to listen for hmr whatever, but that didn't work, because of interplay b/w webextrun and hmr?
}

// skip useless interstitial
const playButton = document.querySelector( '.pz-moment__button' );
if ( null !== playButton ) {
	//playButton.click();

	// only works sometimes, maybe b/c different class for "play" and "continue" ?

	// sometimes leaves the yellow background
}
