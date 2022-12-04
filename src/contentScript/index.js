import React                     from 'react';
import { render }                from 'react-dom';
import { MethodicalSpellingBee } from './main';

const watching = 'object' === typeof module?.hot;

if ( watching ) {
	const playButton = document.querySelector( '.pz-moment__button' );

	if ( null !== playButton ) {
		// Timeout may be necessary to avoid it messing up and leaving the yellow background behind, or other bugs.
		setTimeout(
			function() {
				// Skip useless interstitial.
				playButton.click();

				// Hide clutter.
				document.querySelector( '.pz-footer' ).style.display            = 'none';
				document.getElementById( 'sb-conversion-banner' ).style.display = 'none';
			},
			650
		);
	}
}

const statusBox    = document.querySelector( '.sb-status-box' );
const msbContainer = document.querySelector( '#methodical-spelling-bee' ); // rename to more descriptive, but still need to distinguish from nytimes elements

if ( null !== statusBox && null === msbContainer ) {
	statusBox.insertAdjacentHTML( 'beforeend', '<div id="methodical-spelling-bee"></div>' );

	render(
		<MethodicalSpellingBee />,
		document.querySelector( '#methodical-spelling-bee' )
	);
}
