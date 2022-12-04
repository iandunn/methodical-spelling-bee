import { useEffect, useState  } from 'react';
import { Stats }               from './stats.js';
import { LetterListProgress }  from './letter-list-progress.js';
import { Grid }                from './grid.js';
import './index.css';

const initialFoundWords = getFoundWords();
const initialStats      = getInitialStats( initialFoundWords );

export function MethodicalSpellingBee() {
	const [ loading, setLoading ] = useState( true );
	const [ ready, setReady ]     = useState( false );
	const [ grid, setGrid ]       = useState( {} );
	const [ stats, setStats ]     = useState( {} );
	const [ activeLetterList, setActiveLetterList ] = useState( {} );

	const [ foo, setFoo ] = useState( 1 ); // tmp

	// Fetch today's hints when component mounts.
	useEffect( () => {
		const todaysHints = getTodaysHints();

		todaysHints.then(
			( result ) => {
				const stats           = parseTotalStats( result.querySelector( 'p:nth-of-type( 3 )' ), initialStats );
				const grid            = parseGrid( result.querySelector( 'table' ) );
				const emptyLetterList = parseTwoLetterList( result.querySelector( 'p:nth-of-type( 5 )' ) );

				if ( Object.keys( emptyLetterList ).length ) {
					const lettersList = bumpTwoLettersCount( emptyLetterList, initialFoundWords );
					setActiveLetterList( lettersList );
				}

				setStats( stats );
				setGrid( grid );

				setLoading( false );
			},

			( error ) => {
				console.log( error );
			}
		);
	}, [] );

	// Register a DOM observer when component mounts.
	// It will catch when new words are added to the found list, and update the scores.
	// Observing the DOM instead of local storage, because the latter isn't meant to be done on the same page.
	useEffect( () => {
		const targetNode = document.querySelector( '.sb-wordlist-items-pag' );

		const callback = function ( mutationsList ) {
			for ( const mutation of mutationsList ) {
				if ( mutation.type === 'childList' ) {
					const lettersList = bumpTwoLettersCount( activeLetterList, [ mutation.addedNodes[0].innerText ] );

					setActiveLetterList( lettersList );
					setFoo( Date.now() ); // todo UI only updates b/c this is changing state every timethis makes the ui update, but without this it doesn't update? why?
					// maybe b/c activeletterlist is part of dependency array? no, same happens even when in array
					// so it's something else
					// todo try changing callback function decleration to use usecallback()
				}
			}
		};

		// todo make sure this isn't registered multiple times
		const observer = new MutationObserver( callback );
		observer.observe( targetNode, { childList: true } );

		return function cleanup() {
			observer.disconnect();
		}
	}, [ activeLetterList ] );
	// i think activeletterlist should be in ^, but not totally sure

	if ( loading ) {
		return (
			<p>Loading...</p>
		);
	}

	if ( ! ready ) {
		return (
			<button onClick={ () => setReady( true ) }>
				Ready for Hints
			</button>
		);
	}

	return (
		<>
			<Stats stats={ stats } />
			<Grid grid={ grid } />
			<LetterListProgress progress={ activeLetterList } />
		</>
	);
}

async function getTodaysHints() {
	const link = document.querySelector( 'a.pz-toolbar-button__hints' );
	let html;
	let wrapper;

	try {
		const response = await fetch( link.href );
		html           = await response.text();

		const parser  = new DOMParser();
		const doc     = parser.parseFromString( html, 'text/html' );
		wrapper       = doc.querySelector( 'section.interactive-content > div.interactive-body > div' );

	} catch ( error ) {
		console.log( { error } );
		//test

	} finally {
		if ( html.error ) { // should be response? test
			console.log( 'error', html.error );
		}
	}

	return wrapper;
}

// This just parses it out of the blog post, so it's fragile.
// can/should move this into stats.js? same for other things directly related to stats/grid/twoletter
function parseTotalStats( node, stats ) {
	const matches = node.innerText.match( /(\w+: \d+)/g );
	let key, count;

	for ( let pair of matches ) {
		pair  = pair.split( ': ' );
		key   = pair[0].toLowerCase();
		count = parseInt( pair[1] );

		stats[ key ].total = count;
	}

	return stats;
}

// Get the initial `found` counts for each stat from the DOM.
function getInitialStats( foundWords ) {
	const stats = {
		words: {
			found: foundWords.length,
			total: 0,
		},

		points: {
			found: parseInt( document.querySelector( '.sb-progress-value' ).innerText ),
			total: 0,
		},

		pangrams: {
			found: document.querySelectorAll( '.sb-wordlist-items-pag span.pangram').length,
			total: 0,
		}
	};

	return stats;
}

// This just parses it out of the blog post, so it's fragile.
function parseGrid( node ) {
	const matrix = [];

	return matrix;
}

// This just parses it out of the blog post, so it's fragile.
function parseTwoLetterList( node ) {
	//rename var? is so, do others too

	const cleanText = node.innerHTML.replace( /<.*>/g, '' ).replace( /\s+/g, ' ' ).trim();
	const keyCounts = cleanText.split( ' ' );
	const list      = {};
	let key, count;

	for ( let item of keyCounts ) {
		item  = item.split( '-' );
		key   = item[0].toLowerCase();
		count = item[1];

		list[ key ] = {
			found: 0,
			total: parseInt( count ),
		}
	}

	return list;
}

// Pull the already-found words from local storage.
function getFoundWords() {
	let words;

	try {
		words = JSON.parse( window.localStorage.getItem( 'sb-today' ) ).words;
	} catch ( exception ) {
		words = [];
	}

	return words;
}

// Increase the count of each letter pair with each word.
function bumpTwoLettersCount( letterList, foundWords ) {
	let key;

	for ( const word of foundWords ) {
		key = word.substring( 0, 2 ).toLowerCase();
		letterList[ key ].found++;
	}

	return letterList;
}
