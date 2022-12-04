import { useEffect, useState  } from 'react';
import { LetterListProgress }  from './letter-list-progress.js';
import './index.css';

export function MethodicalSpellingBee() {
	const [ loading, setLoading ] = useState( true );
	const [ ready, setReady ]     = useState( false );
	const [ activeLetterList, setActiveLetterList ] = useState( {} );
	const initialFoundWords = getFoundWords();

	// Fetch today's hints when component mounts.
	useEffect( () => {
		//console.log( 'fetch should only run once' );
		const todaysHints = getTodaysHints();
		// warning about foundwords dependency
		// maybe the below should move outside the effect, and todayshints should be use a ref to save the value outside the effect?

		todaysHints.then(
			( result ) => {
				const emptyLetterList = parseTwoLetterList( result.querySelector( 'p:nth-of-type( 5 )' ) );

				if ( Object.keys( emptyLetterList ).length ) {
					const lettersList = bumpTwoLettersCount( emptyLetterList, initialFoundWords );	// set as state
					setActiveLetterList( lettersList );
					console.log( 'set active let list', activeLetterList ); // this shows it empty, but that's not true b/c i can see it working
					// oh huh, when i add initialFoundWords to deps array below, then ^ starts working, but this func is called 3x a second
					// so keep it in the deps array, and fix that constant rendering w/ useCallback(), like stackoverflow said?
					// need to make sure it only runs once at load

					setLoading( false );
				}
			},

			( error ) => {
				console.log( error );
			}
		);

		// move this whole thing to a function for modularity? so this component would just have
		// useEffect( foo, [] ) ?
		// no b/c it's meant to be inside the caller so it has access to local vars/state. docs say passing state get/setters isn't great
	}, [] );

	// have to declare functions used by the effect inside the effect?
	// that's kinda gross
	// or maybe don't, but need to use useCallback do declare the functions, and then put them in the list?
	// er no, they're defined outside the component, so they're already memoized or whatever?
	// only need usecallback when the function would get recreated every time the effect is called?

	// but maybe the closures inside the comoponet need to use usecallback? but they wouldn't be in the deps array b/c they're not named
	// but that's fine b/c it'd only get called once if leaving the array empty
	// doesn't matter if the effect only gets called once though? i dunno
	//todo before next compile add usecallback to the closures above

	//if can't the usecallback or moving everything inside the effcect dont fix it, then maybe post minimial example to stackoverflow
		// ask how to get it working with your desired structure (funcs defined outside component, empty array argument to useeffect, etc)


	// Register a DOM observer when component mounts.
	// It will catch when new words are added to the found list, and update the scores.
	// Observing the DOM instead of local storage, because the latter isn't meant to be done on the same page.
	useEffect( () => {
		//console.log( 'start of obrserver effect', activeLetterList );

		// to const
		//console.log( 'only register observer callback once' );
			// so maybe i do need the dependency list?
			// oh maybe not b/c this is just registering the callback, which should only happen once?
			// can't remove the dep array like eslint wants, that makes this run 3x a second
			// probably something i'm not understanding or structuring wrong

		const targetNode = document.querySelector( '.sb-wordlist-items-pag' );

		//before next compile, change this to use usecallback. probably wont help make acviteletterlist avavilablle, but still good anyway to prevent creating a ton of these functions and only 1 gets cleaned up or something
		const callback = function ( mutationsList ) {
			for ( const mutation of mutationsList ) {
				if ( mutation.type === 'childList' ) {
					console.log( activeLetterList, mutation.addedNodes[0].innerText ); // problem, activeletlist is emtpy here
					// why?

					const lettersList = bumpTwoLettersCount( activeLetterList, [ mutation.addedNodes[0].innerText ] ); // looks fine inside here
					console.log( lettersList ); // maybe this is the problem?
					// or maybe i need to manually trigger a rerender?
					// or its a smell and i've got things architected wrong b/c if it were right then react would automatically rerender
					// do i need to clone object ?

					setActiveLetterList( lettersList );
				}
			}
		};

		const observer = new MutationObserver( callback );

		observer.observe( targetNode, { childList: true } );

		return function cleanup() {
			console.log( 'cleanup observer' );
			observer.disconnect();
		}
	}, [] );
	// need to include stuff in deps array ^ for this to work? test once things are cleand up
	// prob need do use usecallback to makes sure this isn't registered a ton and memory leaks or whatever

	if ( ! ready ) {
		return (
			<>
				<button onClick={ () => setReady( true ) }>
					Ready for Hints
				</button>
			</>
		);
	}

	return (
		<>
			{ loading &&
				<p>Loading...</p>
			}

			{ ! loading && <LetterListProgress progress={ activeLetterList } /> }
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
function parseTwoLetterList( node ) {
	//rename var?

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
