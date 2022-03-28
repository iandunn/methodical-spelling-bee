!function ( e, t ) {
	'object' == typeof exports && 'undefined' != typeof module ? t( require( 'react' ), require( 'react-dom' ), require( 'react-redux' ), require( 'foundation' ), require( 'redux-thunk' ), require( 'redux' ), require( 'classnames' ), require( 'reselect' ), require( 'responsive' ) ) : 'function' == typeof define && define.amd ? define( ['react', 'react-dom', 'react-redux', 'foundation', 'redux-thunk', 'redux', 'classnames', 'reselect', 'responsive'], t ) : t( ( e = e || self ).React, e.ReactDOM, e.ReactRedux, e.Foundation, e.ReduxThunk, e.Redux, e.classNames, e.Reselect, e.Responsive );
}( this, function ( m, a, d, g, n, r, v, e, b ) {
	'use strict';
	var h = 'default' in m ? m.default : m;
	a = a && Object.prototype.hasOwnProperty.call( a, 'default' ) ? a.default : a, n = n && Object.prototype.hasOwnProperty.call( n, 'default' ) ? n.default : n, v = v && Object.prototype.hasOwnProperty.call( v, 'default' ) ? v.default : v;

	function i( r, t, n, e ) {
		function o() {
			if ( window.SIMULATE_OFFLINE ) {
				return Promise.reject( new Error( 'simulating offline' ) );
			}
			var e = r.getState(),
				t = e.foundWords,
				n = e.userType.nytsCookie;
			E( a, t ), O( a, t, n ).catch( function ( e ) {
				console.error( 'unable to save remote progress', e ), g.captureSentryError( e, {
					msg: 'unable to save remote progress',
					puzzId: a,
					words: null == t ? void 0 : t.join( ',' ),
					cookie: n
				} );
			} );
		}

		var a = ( l = r.getState() ).id,
			i = l.yesterday.id,
			c = l.userType.nytsCookie,
			l = y( a ),
			u = 0;
		l && ( u = l.length, t( l ) ), Promise.all( [w( i, c ).then( function ( e ) {
			e && n( e );
		} ), w( a, c ).then( function ( e ) {
			e && t( e ), o();
		} )
		] ).then( e ), r.subscribe( function () {
			var e = r.getState(),
				t = e.foundWords,
				e = e.userType.nytsCookie;
			u !== t.length && ( u = t.length, 0 === t.length ? ( p( a, e ), f() ) : o() );
		} ), window.addEventListener( 'online', o );
	}

	function o() {
		return {
			type: x
		};
	}

	var t,
		c,
		l,
		u,
		s = 'sb-today',
		f = function () {
			window.localStorage.removeItem( s );
		},
		p = function ( e ) {
			var t = 1 < arguments.length && void 0 !== arguments[ 1 ] ? arguments[ 1 ] : null;
			return delete window.resetProgressComplete, g.xhr.delete( ''.concat( g.env.api, '/svc/spelling-bee/v1/game/' ).concat( e, '.json' ), {
				cookie: t
			} ).then( function () {
				window.resetProgressComplete = !0;
			} ).catch( function ( e ) {
				console.error( e );
			} );
		},
		y = function ( e ) {
			var t = window.localStorage.getItem( s );
			if ( t ) {
				try {
					var n = JSON.parse( t ),
						r = n.words;
					e !== n.id && ( r = f() );
				} catch ( e ) {
					r = f(), console.error( 'could not parse local progress: '.concat( t ) );
				}
			}
			return r;
		},
		w = function ( e ) {
			var t = 1 < arguments.length && void 0 !== arguments[ 1 ] ? arguments[ 1 ] : null;
			return g.xhr.get( ''.concat( g.env.api, '/svc/spelling-bee/v1/game/' ).concat( e, '.json' ), {
				cookie: t
			} ).then( function ( e ) {
				return e.errors ? null : e.answers || [];
			} ).catch( function ( e ) {
				console.error( 'unable to get remote progress', e );
			} );
		},
		E = function ( e, t ) {
			if ( t.length ) {
				try {
					window.localStorage.setItem( s, JSON.stringify( {
						id: e,
						words: t
					} ) );
				} catch ( e ) {
					console.error( 'local storage failure:', e );
				}
			}
		},
		O = function ( e, t ) {
			var n = 2 < arguments.length && void 0 !== arguments[ 2 ] ? arguments[ 2 ] : null;
			return t.length ? g.xhr.put( ''.concat( g.env.api, '/svc/spelling-bee/v1/game.json' ), {
				puzzleID: e,
				answers: t
			}, {
				cookie: n
			} ) : Promise.resolve();
		},
		S = 'LOCK',
		k = 'UNLOCK',
		j = 'SHUFFLE',
		_ = 'INPUT_LETTER',
		N = 'DELETE_LETTER',
		A = 'CLEAR_INPUT',
		T = 'ACCEPT_WORD',
		P = 'SHOW_MESSAGE',
		C = 'CLEAR_MESSAGE',
		I = 'CLEAR_MESSAGE_AND_INPUT',
		x = 'TOGGLE_WORDLIST',
		z = 'RESET_GAME',
		M = 'INSERT_FOUND_WORDS',
		D = 'SET_YESTERDAYS_FOUND_WORDS',
		L = 'UPDATE_USER',
		B = 'UPDATE_CURRENT_MOMENT',
		R = 'SET_HAS_LOADED',
		W = 'SET_GAME_VISIBLE',
		G = 'GET_STATS_BY_DATE',
		$ = function () {
			return {
				type: S
			};
		},
		U = function () {
			return {
				type: k
			};
		},
		H = function () {
			return {
				type: j
			};
		},
		F = function ( e ) {
			return {
				type: M,
				payload: e
			};
		},
		V = function ( e ) {
			return {
				type: D,
				payload: e
			};
		},
		q = function ( e ) {
			return {
				type: G,
				payload: e
			};
		},
		Y = ['modal', 'gameplay', 'settings', 'general'],
		K = ['tech', 'gameplay', 'settings'],
		X = ( t = 'SB', c = g.getGameData().today.id, l = ''.concat( t, '-' ).concat( c ), u = {
			interaction: {
				custom: function ( e, t ) {
					var n = e.module,
						r = n.name,
						e = n.element,
						n = e.name,
						e = e.label;
					Z( 'moduleInteraction', void 0 === r ? 'gameplay' : r, n, void 0 === e ? '' : e, '', t );
				}
			},
			impression: {
				custom: function ( e ) {
					var t = e.module,
						n = t.name,
						e = t.region,
						t = t.label;
					Z( 'impression', void 0 === n ? 'gameplay' : n, e, void 0 === t ? '' : t );
				}
			}
		}, Y.forEach( function ( n ) {
			u.interaction[ n ] = function ( e, t ) {
				return Z( 'moduleInteraction', n, e, t, 2 < arguments.length && void 0 !== arguments[ 2 ] ? arguments[ 2 ] : null );
			};
		} ), K.forEach( function ( n ) {
			u.impression[ n ] = function ( e, t ) {
				return Z( 'impression', n, e, t );
			};
		} ), u );

	function Z( e, t, n, r, o, a ) {
		g.track( e, 'moduleInteraction' === e ? {
			module: {
				name: t,
				context: l,
				label: o,
				element: {
					name: n || '',
					label: 'string' == typeof r ? r : JSON.stringify( r )
				}
			},
			eventData: {
				pageType: 'game',
				type: a ? 'ob_click' : 'click',
				trigger: 'module',
				status: ''
			}
		} : {
			module: {
				name: t,
				context: l,
				region: n || '',
				label: 'string' == typeof r ? r : JSON.stringify( r )
			}
		} );
	}

	var Q = {
			help: 'help',
			ranks: 'rankings',
			yesterday: 'yesterdays-answers'
		},
		J = function ( e ) {
			X.interaction.modal( 'spelling-bee', e, 1 < arguments.length && void 0 !== arguments[ 1 ] ? arguments[ 1 ] : null );
		},
		ee = function ( e ) {
			e && g.track( 'moduleInteraction', {
				module: {
					element: {
						name: 'spelling-bee',
						label: 'x-out-pangram-education'
					},
					label: e,
					context: 'SB-'.concat( g.getGameData().today.id )
				}
			} );
		},
		te = function ( e ) {
			e && g.track( 'impression', {
				module: {
					name: 'pangram-education',
					region: 'spelling-bee',
					label: e,
					context: 'SB-'.concat( g.getGameData().today.id )
				}
			} );
		};

	function ne( e ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return re( e );
			}
		}( e ) || function ( e ) {
			if ( 'undefined' != typeof Symbol && null != e[ Symbol.iterator ] || null != e[ '@@iterator' ] ) {
				return Array.from( e );
			}
		}( e ) || function ( e, t ) {
			if ( e ) {
				if ( 'string' == typeof e ) {
					return re( e, t );
				}
				var n = Object.prototype.toString.call( e ).slice( 8, - 1 );
				return 'Map' === ( n = 'Object' === n && e.constructor ? e.constructor.name : n ) || 'Set' === n ? Array.from( e ) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ? re( e, t ) : void 0;
			}
		}( e ) || function () {
			throw new TypeError( 'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function re( e, t ) {
		( null == t || t > e.length ) && ( t = e.length );
		for ( var n = 0, r = new Array( t ); n < t; n ++ ) r[ n ] = e[ n ];
		return r;
	}

	function oe( o, a ) {
		var i;
		return function () {
			for ( var e = arguments.length, t = new Array( e ), n = 0; n < e; n ++ ) t[ n ] = arguments[ n ];
			var r = this;
			clearTimeout( i ), i = setTimeout( function () {
				return o.apply( r, t );
			}, a );
		};
	}

	function ae( e ) {
		var t;
		return 2 * e < 1 ? ( t = 2 * e, .5 * Math.pow( t, 3 ) ) : ( t = e - 2, .5 * Math.pow( t, 3 ) + 2 );
	}

	function ie() {
		return Date.now();
	}

	var ce = function e( t, n ) {
			for ( var r = ne( t ), o = r.length; o; ) {
				-- o;
				var a = Math.floor( Math.random() * o ),
					i = r[ o ];
				if ( r[ o ] = r[ a ], r[ a ] = i, n && ( t[ o ] === r[ o ] || t[ a ] === r[ a ] ) ) {
					return e( t, !0 );
				}
			}
			return r;
		},
		le = function ( t ) {
			return new Promise( function ( e ) {
				setTimeout( e, t );
			} );
		},
		ue = 'top',
		se = 'position',
		fe = 'overflow',
		me = 'visibility',
		de = 'minHeight',
		pe = 'backgroundColor',
		ye = 'hidden',
		be = 'static',
		ge = 'visible',
		ve = 'relative',
		he = 'absolute',
		we = 'on-stage',
		Ee = 'fly-in',
		Oe = 'fly-out',
		Se = 'slide-up',
		ke = 'modal-card',
		je = 'sequence-animation',
		_e = 400,
		Ne = function ( e, t, n ) {
			e.style[ t ] = n;
		},
		Ae = function ( e, t ) {
			e.classList.add( t );
		},
		Te = function ( e, t ) {
			e.length ? e.forEach( function ( e ) {
				e.classList.remove( t );
			} ) : e.classList.remove( t );
		},
		Pe = function ( a, i, c, l, u ) {
			var s = 5 < arguments.length && void 0 !== arguments[ 5 ] ? arguments[ 5 ] : ae,
				f = 6 < arguments.length && void 0 !== arguments[ 6 ] ? arguments[ 6 ] : 'px';
			return new Promise( function ( n ) {
				var r = l - c,
					o = ie();
				( function e() {
					var t = 1 <= ( t = ( ie() - o ) / u ) ? 1 : t;
					a.style[ i ] = Math.min( c + s( t ) * r + f, l ), 1 === t ? n() : window.requestAnimationFrame( e );
				} )();
			} );
		},
		Ce = function ( e, t ) {
			var n = 0;
			e.forEach( function ( e ) {
				e && ( n += t, Ne( e, 'transitionDelay', ''.concat( n, 'ms' ) ), Ae( e, Se ) );
			} );
		};

	function Ie( e ) {
		return ( Ie = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function ( e ) {
			return typeof e;
		} : function ( e ) {
			return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
		} )( e );
	}

	function xe() {
		return ( xe = Object.assign || function ( e ) {
			for ( var t = 1; t < arguments.length; t ++ ) {
				var n,
					r = arguments[ t ];
				for ( n in r ) Object.prototype.hasOwnProperty.call( r, n ) && ( e[ n ] = r[ n ] );
			}
			return e;
		} ).apply( this, arguments );
	}

	function ze( e, t ) {
		for ( var n = 0; n < t.length; n ++ ) {
			var r = t[ n ];
			r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && ( r.writable = !0 ), Object.defineProperty( e, r.key, r );
		}
	}

	function Me( e, t ) {
		return ( Me = Object.setPrototypeOf || function ( e, t ) {
			return e.__proto__ = t, e;
		} )( e, t );
	}

	function De( n ) {
		var r = function () {
			if ( 'undefined' == typeof Reflect || !Reflect.construct ) {
				return !1;
			}
			if ( Reflect.construct.sham ) {
				return !1;
			}
			if ( 'function' == typeof Proxy ) {
				return !0;
			}
			try {
				return Boolean.prototype.valueOf.call( Reflect.construct( Boolean, [], function () {
				} ) ), !0;
			} catch ( e ) {
				return !1;
			}
		}();
		return function () {
			var e,
				t = Be( n );
			return function ( e, t ) {
				{
					if ( t && ( 'object' === Ie( t ) || 'function' == typeof t ) ) {
						return t;
					}
					if ( void 0 !== t ) {
						throw new TypeError( 'Derived constructors may only return object or undefined' );
					}
				}
				return Le( e );
			}( this, r ? ( e = Be( this ).constructor, Reflect.construct( t, arguments, e ) ) : t.apply( this, arguments ) );
		};
	}

	function Le( e ) {
		if ( void 0 === e ) {
			throw new ReferenceError( 'this hasn\'t been initialised - super() hasn\'t been called' );
		}
		return e;
	}

	function Be( e ) {
		return ( Be = Object.setPrototypeOf ? Object.getPrototypeOf : function ( e ) {
			return e.__proto__ || Object.getPrototypeOf( e );
		} )( e );
	}

	function Re( e ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return We( e );
			}
		}( e ) || function ( e ) {
			if ( 'undefined' != typeof Symbol && null != e[ Symbol.iterator ] || null != e[ '@@iterator' ] ) {
				return Array.from( e );
			}
		}( e ) || function ( e, t ) {
			if ( e ) {
				if ( 'string' == typeof e ) {
					return We( e, t );
				}
				var n = Object.prototype.toString.call( e ).slice( 8, - 1 );
				return 'Map' === ( n = 'Object' === n && e.constructor ? e.constructor.name : n ) || 'Set' === n ? Array.from( e ) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ? We( e, t ) : void 0;
			}
		}( e ) || function () {
			throw new TypeError( 'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function We( e, t ) {
		( null == t || t > e.length ) && ( t = e.length );
		for ( var n = 0, r = new Array( t ); n < t; n ++ ) r[ n ] = e[ n ];
		return r;
	}

	var Ge = d.useSelector,
		$e = {
			$black: '#000',
			$white: '#fff',
			$blue1: '#083aaa',
			$blue2: '#2860d8',
			$blue3: '#4f85e5',
			$blue35: '#5aa0d5',
			$blue4: '#a7d8ff',
			$blue5: '#dcefff',
			$blue7: '#477aaa',
			$purple1: '#5960ec',
			'$error-red': '#ce2424',
			$gray1: '#333',
			$gray2: '#959595',
			$gray3: '#ccc',
			$gray4: '#dcdcdc',
			$gray5: '#e6e6e6',
			$gray6: '#f4f4f4',
			$gray7: '#fafafa',
			$gray8: '#c4c4c4',
			$gray9: '#c2c2c2',
			$gray10: '#d9d9d9',
			$gray11: '#eee',
			$newsGray10: '#dfdfdf',
			$newsGray25: '#c7c7c7',
			$newsGray85: '#363636',
			$newsGray100: '#121212',
			$blueGray1: '#787886',
			$gold1: '#c4a200',
			$gold2: '#e2c32f',
			$yellow1: '#ffda00',
			$green1: '#6dc3a1',
			$statsPink: '#f93aa7',
			$statsYellow: '#ffc600',
			'$spelling-bee-yellow': '#f8cd05',
			'$letter-boxed-pink': '#faa6a4',
			'$vertex-tan': '#f7f5f6',
			$bannerBlue: '#4d88f9',
			'$daily-crossword-blue': '#6493e6',
			'$mini-crossword-blue': '#95befa',
			'$spelling-bee-gold': '#f7da21',
			'$tiles-green': '#b5e352',
			'$letter-boxed-red': '#e05c56',
			'$vertex-turquoise': '#00a2b3',
			'$sudoku-orange': '#fb9b00'
		};

	function Ue( e, t ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return e;
			}
		}( e ) || function ( e, t ) {
			var n = null == e ? null : 'undefined' != typeof Symbol && e[ Symbol.iterator ] || e[ '@@iterator' ];
			if ( null != n ) {
				var r,
					o,
					a = [],
					i = !0,
					c = !1;
				try {
					for ( n = n.call( e ); !( i = ( r = n.next() ).done ) && ( a.push( r.value ), !t || a.length !== t ); i = !0 ) ;
				} catch ( e ) {
					c = !0, o = e;
				} finally {
					try {
						i || null == n.return || n.return();
					} finally {
						if ( c ) {
							throw o;
						}
					}
				}
				return a;
			}
		}( e, t ) || function ( e, t ) {
			if ( e ) {
				if ( 'string' == typeof e ) {
					return He( e, t );
				}
				var n = Object.prototype.toString.call( e ).slice( 8, - 1 );
				return 'Map' === ( n = 'Object' === n && e.constructor ? e.constructor.name : n ) || 'Set' === n ? Array.from( e ) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ? He( e, t ) : void 0;
			}
		}( e, t ) || function () {
			throw new TypeError( 'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function He( e, t ) {
		( null == t || t > e.length ) && ( t = e.length );
		for ( var n = 0, r = new Array( t ); n < t; n ++ ) r[ n ] = e[ n ];
		return r;
	}

	var Fe = function ( e ) {
		var t = e.momentSystem,
			n = e.transitionTo,
			r = e.barBgColor,
			o = void 0 === r ? 'rgba(0, 0, 0, 0.2)' : r,
			r = e.barColor,
			r = void 0 === r ? '#FFF' : r,
			e = e.hasLoaded,
			a = void 0 !== e && e,
			e = Ue( m.useState( 10 ), 2 ),
			i = e[ 0 ],
			c = e[ 1 ],
			e = Ue( m.useState( null ), 2 ),
			l = e[ 0 ],
			u = e[ 1 ];
		return m.useEffect( function () {
			var e;
			a ? ( clearTimeout( l ), t.transition( 'loading', n ) ) : i <= 100 && ( e = setTimeout( function () {
				c( i + 20 * Math.random() );
			}, 30 + 150 * Math.random() ), u( e ) );
		}, [i, a] ), h.createElement( 'div', {
			className: 'pz-loader',
			id: 'pz-loading-bar',
			style: {
				background: o
			}
		}, h.createElement( 'div', {
			className: 'pz-loader__fill',
			style: {
				background: r,
				right: ''.concat( Math.max( 100 - i, 0 ), '%' )
			}
		} ) );
	};

	function Ve() {
		return ( Ve = Object.assign || function ( e ) {
			for ( var t = 1; t < arguments.length; t ++ ) {
				var n,
					r = arguments[ t ];
				for ( n in r ) Object.prototype.hasOwnProperty.call( r, n ) && ( e[ n ] = r[ n ] );
			}
			return e;
		} ).apply( this, arguments );
	}

	function qe( e ) {
		return h.createElement( 'button', Ve( {
			type: 'button',
			className: 'pz-hybrid-back'
		}, e ), h.createElement( 'span', {
			className: 'pz-hybrid-back__text'
		}, 'Back' ) );
	}

	function Ye( e ) {
		return ( e = void 0 === ( e = e.plays ) ? '' : e ) && h.createElement( 'p', {
			className: v( 'pz-moment__plays' ),
			dangerouslySetInnerHTML: {
				__html: e
			}
		} );
	}

	function Ke( e ) {
		return e = e.date, h.createElement( 'span', {
			className: 'pz-moment__info-date'
		}, e );
	}

	function Xe( e ) {
		return ( e = e.editor ) ? h.createElement( 'span', {
			className: 'pz-moment__info-editor'
		}, 'Edited by '.concat( e ) ) : null;
	}

	function Ze( e ) {
		return e = e.children, h.createElement( 'span', {
			className: 'pz-moment__info-text'
		}, e );
	}

	function Qe( e ) {
		return 'oxford' === e.promo && h.createElement( 'p', null, h.createElement( 'a', {
			href: 'https://www.oxforddictionaries.com',
			target: '_blank',
			rel: 'noopener noreferrer',
			className: 'pz-moment__promo'
		} ) );
	}

	var Je = function () {
			return window.isHybridWebView && window.NativeBridge ? h.createElement( qe, {
				onClick: window.NativeBridge.gamesBackToHub
			} ) : null;
		},
		et = function ( e ) {
			e = e.action;
			return h.createElement( 'button', {
				type: 'button',
				className: 'pz-moment__close',
				'aria-label': 'Close',
				onClick: e
			}, '×' );
		},
		tt = function ( e ) {
			var t = e.icon,
				e = e.size;
			return h.createElement( 'div', {
				className: v( 'pz-moment__icon', void 0 === e ? 'large' : e, t )
			} );
		},
		nt = function ( e ) {
			var t = e.text,
				e = e.size;
			return h.createElement( 'h1', {
				className: v( 'pz-moment__title', void 0 === e ? 'large' : e )
			}, t );
		},
		rt = function ( e ) {
			var t = e.text,
				e = e.variant;
			return h.createElement( 'h1', {
				className: v( 'pz-moment__description', void 0 === e ? 'default' : e ),
				dangerouslySetInnerHTML: {
					__html: t
				}
			} );
		},
		ot = function ( e ) {
			e = e.children;
			return h.createElement( 'div', {
				className: 'pz-moment__body'
			}, e );
		},
		at = function ( e ) {
			var t = e.action,
				n = e.text,
				r = e.color,
				o = e.variant,
				e = e.icon;
			return h.createElement( 'button', {
				type: 'button',
				className: v( 'pz-moment__button', void 0 === r ? 'primary' : r, o ),
				onClick: t
			}, n, 'locked' === e && h.createElement( 'div', {
				className: 'pz-moment__button--padlock'
			} ) );
		},
		it = function ( e ) {
			var t = e.bgColor,
				e = e.children;
			return h.createElement( 'div', {
				className: 'pz-moment',
				style: {
					backgroundColor: $e[ void 0 === t ? '$gray3' : t ]
				}
			}, e );
		},
		ct = ['icon', 'title', 'bgColor', 'description', 'isActive'];

	function lt( e, t ) {
		if ( null == e ) {
			return {};
		}
		var n,
			r = function ( e, t ) {
				if ( null == e ) {
					return {};
				}
				var n,
					r,
					o = {},
					a = Object.keys( e );
				for ( r = 0; r < a.length; r ++ ) n = a[ r ], 0 <= t.indexOf( n ) || ( o[ n ] = e[ n ] );
				return o;
			}( e, t );
		if ( Object.getOwnPropertySymbols ) {
			for ( var o = Object.getOwnPropertySymbols( e ), a = 0; a < o.length; a ++ ) n = o[ a ], 0 <= t.indexOf( n ) || Object.prototype.propertyIsEnumerable.call( e, n ) && ( r[ n ] = e[ n ] );
		}
		return r;
	}

	function ut( e ) {
		var t = e.icon,
			n = e.title,
			r = void 0 === ( a = e.bgColor ) ? '$gray3' : a,
			o = e.description,
			a = e.isActive,
			e = lt( e, ct );
		return h.useEffect( function () {
			document.getElementById( 'js-hook-pz-moment__loading' ).style[ 'background-color' ] = $e[ r ];
		}, [] ), h.createElement( 'div', {
			className: 'pz-loader-container'
		}, h.createElement( Je, null ), h.createElement( tt, {
			icon: t,
			size: 'large'
		} ), h.createElement( nt, {
			text: n,
			size: 'large'
		} ), h.createElement( rt, {
			text: o
		} ), a && h.createElement( Fe, e ) );
	}

	function st( t, e ) {
		var n,
			r = Object.keys( t );
		return Object.getOwnPropertySymbols && ( n = Object.getOwnPropertySymbols( t ), e && ( n = n.filter( function ( e ) {
			return Object.getOwnPropertyDescriptor( t, e ).enumerable;
		} ) ), r.push.apply( r, n ) ), r;
	}

	function ft( r ) {
		for ( var e = 1; e < arguments.length; e ++ ) {
			var o = null != arguments[ e ] ? arguments[ e ] : {};
			e % 2 ? st( Object( o ), !0 ).forEach( function ( e ) {
				var t,
					n;
				t = r, e = o[ n = e ], n in t ? Object.defineProperty( t, n, {
					value: e,
					enumerable: !0,
					configurable: !0,
					writable: !0
				} ) : t[ n ] = e;
			} ) : Object.getOwnPropertyDescriptors ? Object.defineProperties( r, Object.getOwnPropertyDescriptors( o ) ) : st( Object( o ) ).forEach( function ( e ) {
				Object.defineProperty( r, e, Object.getOwnPropertyDescriptor( o, e ) );
			} );
		}
		return r;
	}

	function mt( e, t ) {
		t( {
			isLoggedIn: e.isUserLoggedIn,
			hasXwd: e.isSubscribed,
			regiId: e.regiID,
			nytsCookie: e.nytsCookie
		} );
	}

	function dt( e ) {
		return e = bt( e ), window.isHybridWebView && window.NativeBridge ? window.NativeBridge.gamesAuthenticateUser( 'subscribe' ).then( function ( e ) {
			if ( !e.success ) {
				throw new Error( e.error );
			}
			window.dispatchEvent( new CustomEvent( 'gamesUserCredentialChanged', {
				detail: e
			} ) );
		} ).catch( function ( e ) {
			console.error( 'Failed to authenticate user', e );
		} ) : gt( e ) ? vt( e ) : window.location.assign( e ), null;
	}

	var pt = {
			bgColor: '$spelling-bee-gold',
			barBgColor: 'rgba(255, 255, 255, 0.6)',
			barColor: 'black',
			transitionTo: 'welcome'
		},
		yt = 'https://www.nytimes.com/subscription/games',
		bt = function ( e ) {
			var t = 1 < arguments.length && void 0 !== arguments[ 1 ] ? arguments[ 1 ] : window;
			if ( !t || !t.navigationLinks || !t.navigationLinks.subscribe ) {
				return yt;
			}
			t = t.navigationLinks.subscribe;
			return e && t[ e ] ? t[ e ] : yt;
		},
		gt = function () {
			var e = 0 < arguments.length && void 0 !== arguments[ 0 ] ? arguments[ 0 ] : '';
			return 0 === e.indexOf( 'nytimes://' ) || 0 === e.indexOf( 'nytxwd://' );
		},
		vt = function () {
			var e = 0 < arguments.length && void 0 !== arguments[ 0 ] ? arguments[ 0 ] : '',
				t = 1 < arguments.length && void 0 !== arguments[ 1 ] ? arguments[ 1 ] : document;
			if ( !e ) {
				return null;
			}
			t = t.createElement( 'a' );
			t.href = e, t.click();
		};

	function ht( e, t ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return e;
			}
		}( e ) || function ( e, t ) {
			var n = null == e ? null : 'undefined' != typeof Symbol && e[ Symbol.iterator ] || e[ '@@iterator' ];
			if ( null != n ) {
				var r,
					o,
					a = [],
					i = !0,
					c = !1;
				try {
					for ( n = n.call( e ); !( i = ( r = n.next() ).done ) && ( a.push( r.value ), !t || a.length !== t ); i = !0 ) ;
				} catch ( e ) {
					c = !0, o = e;
				} finally {
					try {
						i || null == n.return || n.return();
					} finally {
						if ( c ) {
							throw o;
						}
					}
				}
				return a;
			}
		}( e, t ) || function ( e, t ) {
			if ( e ) {
				if ( 'string' == typeof e ) {
					return wt( e, t );
				}
				var n = Object.prototype.toString.call( e ).slice( 8, - 1 );
				return 'Map' === ( n = 'Object' === n && e.constructor ? e.constructor.name : n ) || 'Set' === n ? Array.from( e ) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ? wt( e, t ) : void 0;
			}
		}( e, t ) || function () {
			throw new TypeError( 'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function wt( e, t ) {
		( null == t || t > e.length ) && ( t = e.length );
		for ( var n = 0, r = new Array( t ); n < t; n ++ ) r[ n ] = e[ n ];
		return r;
	}

	function Et( e, n ) {
		return e.reduce( function ( e, t ) {
			return e + jt( t, n.includes( t ) );
		}, 0 );
	}

	function Ot( e ) {
		return Et( e.foundWords, e.pangrams );
	}

	function St( e ) {
		return e.yesterday.foundWords;
	}

	var kt = [
			['Beginner', 0],
			['Good Start', 2],
			['Moving Up', 5],
			['Good', 8],
			['Solid', 15],
			['Nice', 25],
			['Great', 40],
			['Amazing', 50],
			['Genius', 70]
		],
		jt = function ( e, t ) {
			return e.length < 5 ? 1 : e.length + ( t ? 7 : 0 );
		},
		_t = function ( n ) {
			return kt.map( function ( e ) {
				var t = ht( e, 2 ),
					e = t[ 0 ],
					t = t[ 1 ];
				return {
					title: e,
					minScore: Math.round( t / 100 * n )
				};
			} );
		},
		Nt = function ( e, t ) {
			for ( var n = 0; n < t.length && !( e < t[ n ].minScore ); n += 1 ) ;
			return n - 1;
		},
		At = function ( e ) {
			return kt[ e ][ 0 ];
		},
		Tt = function ( t ) {
			return 'Queen Bee' === t ? 9 : kt.findIndex( function ( e ) {
				return e[ 0 ] === t;
			} );
		},
		Pt = [{
			score_type: [{
				id: 'b691f963-3844-4ddf-83e7-8fb0fc02c95a',
				updated_at: '2022-01-30T23:15:02Z',
				user_id: 171040582,
				game_type: 'spelling_bee',
				puzzle_id: '16776',
				label: 'Amazing',
				value: 58,
				score_type: 'points'
			}, {
				id: '161a9db8-2c31-41f7-9194-6f5e489ee004',
				updated_at: '2022-01-30T16:53:16Z',
				user_id: 171040582,
				game_type: 'spelling_bee',
				puzzle_id: '16776',
				label: 'Good',
				value: 9,
				score_type: 'points'
			}, {
				id: '17e3eade-4841-49eb-a706-9b5c2d5630a8',
				updated_at: '2022-01-30T16:52:35Z',
				user_id: 171040582,
				game_type: 'spelling_bee',
				puzzle_id: '16776',
				label: 'Good Start',
				value: 2,
				score_type: 'points'
			}, {
				id: 'ce77b68d-32c0-459e-b506-deb1ea65ede8',
				updated_at: '2022-01-30T23:14:02Z',
				user_id: 171040582,
				game_type: 'spelling_bee',
				puzzle_id: '16776',
				label: 'Great',
				value: 46,
				score_type: 'points'
			}, {
				id: '8b2353ed-2656-4035-bf64-33db6f750b9e',
				updated_at: '2022-01-30T16:52:59Z',
				user_id: 171040582,
				game_type: 'spelling_bee',
				puzzle_id: '16776',
				label: 'Moving Up',
				value: 6,
				score_type: 'points'
			}, {
				id: 'ee31a0c7-fdbb-467f-8026-63ba7e7d2992',
				updated_at: '2022-01-30T19:07:13Z',
				user_id: 171040582,
				game_type: 'spelling_bee',
				puzzle_id: '16776',
				label: 'Nice',
				value: 35,
				score_type: 'points'
			}, {
				id: 'a9fcc3a6-f108-4d31-bbd2-a70e591f1571',
				updated_at: '2022-01-30T16:53:23Z',
				user_id: 171040582,
				game_type: 'spelling_bee',
				puzzle_id: '16776',
				label: 'Solid',
				value: 19,
				score_type: 'points'
			}, {
				id: 'cc3913e1-6e78-4821-89c2-7e744e61fd31',
				updated_at: '2022-01-24T16:58:57Z',
				user_id: 171040582,
				game_type: 'spelling_bee',
				puzzle_id: '19084',
				label: 'Amazing',
				value: 83,
				score_type: 'points'
			}, {
				id: '2e21363c-8976-4914-95c3-c39fcd0f8c05',
				updated_at: '2022-01-25T06:06:09Z',
				user_id: 171040582,
				game_type: 'spelling_bee',
				puzzle_id: '19084',
				label: 'Genius',
				value: 122,
				score_type: 'points'
			}, {
				id: 'e0569be5-2b7d-44dd-b8ea-1746ecb43bb0',
				updated_at: '2022-01-24T16:46:22Z',
				user_id: 171040582,
				game_type: 'spelling_bee',
				puzzle_id: '19084',
				label: 'Good',
				value: 14,
				score_type: 'points'
			}
			]
		}
		],
		Ct = function ( e ) {
			return Et( e.answers, e.pangrams );
		},
		It = e.createSelector( Ct, _t ),
		xt = e.createSelector( [Ot, It], Nt ),
		zt = e.createSelector( xt, At ),
		Mt = e.createSelector( [xt], function ( e ) {
			return e === kt.length - 1;
		} ),
		Dt = e.createSelector( [Ot, Ct], function ( e, t ) {
			return e === t;
		} ),
		Lt = function ( e ) {
			return e.userType;
		},
		Bt = e.createSelector( [xt, Lt], function ( e, t ) {
			return !t.hasXwd && 4 <= e;
		} ),
		Rt = e.createSelector( [St], function ( e ) {
			return new Set( e );
		} ),
		Wt = e.createSelector( [function ( e ) {
			return e.yesterday.pangrams;
		}
		], function ( e ) {
			return new Set( e );
		} ),
		Ct = function ( e ) {
			return Et( e.yesterday.answers, e.yesterday.pangrams );
		},
		Gt = function ( e ) {
			return null === e.yesterday.foundWords ? 0 : Et( e.yesterday.foundWords, e.yesterday.pangrams );
		},
		_t = e.createSelector( Ct, _t ),
		Nt = e.createSelector( [Gt, _t], Nt ),
		$t = e.createSelector( Nt, At ),
		Ut = e.createSelector( [Gt, Ct], function ( e, t ) {
			return e === t;
		} );

	function Ht() {
		return ( Ht = Object.assign || function ( e ) {
			for ( var t = 1; t < arguments.length; t ++ ) {
				var n,
					r = arguments[ t ];
				for ( n in r ) Object.prototype.hasOwnProperty.call( r, n ) && ( e[ n ] = r[ n ] );
			}
			return e;
		} ).apply( this, arguments );
	}

	var Ft = function ( e ) {
			e = e.game;
			return h.createElement( it, {
				bgColor: e.bgColor
			}, h.createElement( 'div', {
				className: 'pz-moment__container alternate'
			}, h.createElement( Je, null ), h.createElement( 'div', {
				className: 'pz-moment__content sequence-animation'
			}, h.createElement( tt, {
				icon: e.icon,
				size: 'large'
			} ), h.createElement( nt, {
				text: e.title,
				size: 'large'
			} ), h.createElement( rt, e.description ), h.createElement( Ye, e.meta ), h.createElement( 'div', {
				className: 'pz-moment__button-wrapper'
			}, ( e.buttons || [] ).map( function ( e, t ) {
				return h.createElement( at, Ht( {}, e, {
					key: t
				} ) );
			} ), e.bodyText && h.createElement( ot, null, e.bodyText ) ), h.createElement( 'p', {
				className: 'pz-moment__info'
			}, h.createElement( Ke, {
				date: e.date
			} ), h.createElement( Xe, {
				editor: e.editor
			} ), e.infoText && h.createElement( Ze, null, e.infoText ) ), h.createElement( Qe, {
				promo: e.promo
			} ) ) ) );
		},
		Vt = ['transitionToGame', 'handleSubscribe', 'trackInteraction', 'userType'];

	function qt( t, e ) {
		var n,
			r = Object.keys( t );
		return Object.getOwnPropertySymbols && ( n = Object.getOwnPropertySymbols( t ), e && ( n = n.filter( function ( e ) {
			return Object.getOwnPropertyDescriptor( t, e ).enumerable;
		} ) ), r.push.apply( r, n ) ), r;
	}

	function Yt( r ) {
		for ( var e = 1; e < arguments.length; e ++ ) {
			var o = null != arguments[ e ] ? arguments[ e ] : {};
			e % 2 ? qt( Object( o ), !0 ).forEach( function ( e ) {
				var t,
					n;
				t = r, e = o[ n = e ], n in t ? Object.defineProperty( t, n, {
					value: e,
					enumerable: !0,
					configurable: !0,
					writable: !0
				} ) : t[ n ] = e;
			} ) : Object.getOwnPropertyDescriptors ? Object.defineProperties( r, Object.getOwnPropertyDescriptors( o ) ) : qt( Object( o ) ).forEach( function ( e ) {
				Object.defineProperty( r, e, Object.getOwnPropertyDescriptor( o, e ) );
			} );
		}
		return r;
	}

	function Kt( e, t ) {
		if ( null == e ) {
			return {};
		}
		var n,
			r = function ( e, t ) {
				if ( null == e ) {
					return {};
				}
				var n,
					r,
					o = {},
					a = Object.keys( e );
				for ( r = 0; r < a.length; r ++ ) n = a[ r ], 0 <= t.indexOf( n ) || ( o[ n ] = e[ n ] );
				return o;
			}( e, t );
		if ( Object.getOwnPropertySymbols ) {
			for ( var o = Object.getOwnPropertySymbols( e ), a = 0; a < o.length; a ++ ) n = o[ a ], 0 <= t.indexOf( n ) || Object.prototype.propertyIsEnumerable.call( e, n ) && ( r[ n ] = e[ n ] );
		}
		return r;
	}

	function Xt( e ) {
		var t = e.transitionToGame,
			n = e.handleSubscribe,
			r = e.trackInteraction,
			o = e.userType,
			e = Yt( Yt( {}, Kt( e, Vt ) ), {}, {
				buttons: [{
					text: 'Play',
					action: function () {
						t(), r( 'start-game' );
					}
				}
				],
				description: {
					text: 'How many words can you make with&nbsp;7&nbsp;letters?'
				}
			} );
		return o.hasXwd || e.buttons.push( {
			text: 'Subscribe',
			color: 'secondary',
			action: function () {
				n( 'spellingBeeCutoffStart' ), r( 'subscribe-welcome' );
			}
		} ), h.createElement( Ft, {
			game: e
		} );
	}

	function Zt() {
		return ( Zt = Object.assign || function ( e ) {
			for ( var t = 1; t < arguments.length; t ++ ) {
				var n,
					r = arguments[ t ];
				for ( n in r ) Object.prototype.hasOwnProperty.call( r, n ) && ( e[ n ] = r[ n ] );
			}
			return e;
		} ).apply( this, arguments );
	}

	var Qt = function ( e ) {
			e = e.game;
			return h.createElement( it, {
				bgColor: e.bgColor
			}, h.createElement( 'div', {
				className: 'pz-moment__container alternate'
			}, h.createElement( Je, null ), h.createElement( 'div', {
				className: 'pz-moment__content sequence-animation'
			}, h.createElement( tt, {
				icon: e.icon,
				size: 'small'
			} ), h.createElement( nt, {
				text: e.title,
				size: 'small'
			} ), h.createElement( nt, {
				text: 'Welcome Back',
				size: 'large'
			} ), h.createElement( rt, e.description ), h.createElement( 'div', {
				className: 'pz-moment__button-wrapper'
			}, ( e.buttons || [] ).map( function ( e, t ) {
				return h.createElement( at, Zt( {}, e, {
					key: t
				} ) );
			} ) ), h.createElement( 'p', {
				className: 'pz-moment__info'
			}, h.createElement( Ke, {
				date: e.date
			} ), h.createElement( Xe, {
				editor: e.editor
			} ) ) ) ) );
		},
		Jt = ['wordCount', 'transitionToGame', 'handleSubscribe', 'trackInteraction', 'userType'];

	function en( t, e ) {
		var n,
			r = Object.keys( t );
		return Object.getOwnPropertySymbols && ( n = Object.getOwnPropertySymbols( t ), e && ( n = n.filter( function ( e ) {
			return Object.getOwnPropertyDescriptor( t, e ).enumerable;
		} ) ), r.push.apply( r, n ) ), r;
	}

	function tn( r ) {
		for ( var e = 1; e < arguments.length; e ++ ) {
			var o = null != arguments[ e ] ? arguments[ e ] : {};
			e % 2 ? en( Object( o ), !0 ).forEach( function ( e ) {
				var t,
					n;
				t = r, e = o[ n = e ], n in t ? Object.defineProperty( t, n, {
					value: e,
					enumerable: !0,
					configurable: !0,
					writable: !0
				} ) : t[ n ] = e;
			} ) : Object.getOwnPropertyDescriptors ? Object.defineProperties( r, Object.getOwnPropertyDescriptors( o ) ) : en( Object( o ) ).forEach( function ( e ) {
				Object.defineProperty( r, e, Object.getOwnPropertyDescriptor( o, e ) );
			} );
		}
		return r;
	}

	function nn( e, t ) {
		if ( null == e ) {
			return {};
		}
		var n,
			r = function ( e, t ) {
				if ( null == e ) {
					return {};
				}
				var n,
					r,
					o = {},
					a = Object.keys( e );
				for ( r = 0; r < a.length; r ++ ) n = a[ r ], 0 <= t.indexOf( n ) || ( o[ n ] = e[ n ] );
				return o;
			}( e, t );
		if ( Object.getOwnPropertySymbols ) {
			for ( var o = Object.getOwnPropertySymbols( e ), a = 0; a < o.length; a ++ ) n = o[ a ], 0 <= t.indexOf( n ) || Object.prototype.propertyIsEnumerable.call( e, n ) && ( r[ n ] = e[ n ] );
		}
		return r;
	}

	function rn( e ) {
		var t = e.wordCount,
			n = e.transitionToGame,
			r = e.handleSubscribe,
			o = e.trackInteraction,
			a = e.userType,
			t = tn( tn( {}, nn( e, Jt ) ), {}, {
				buttons: [{
					text: 'Continue',
					action: function () {
						n(), o( 'continue' );
					}
				}
				],
				description: {
					text: 'You’ve found '.concat( t, '&nbsp;word' ).concat( 1 < t ? 's' : '', '.' )
				}
			} );
		return a.hasXwd || t.buttons.push( {
			text: 'Subscribe',
			color: 'secondary',
			action: function () {
				r( 'spellingBeeCutoffWelcomeBack' ), o( 'subscribe-welcome-back' );
			}
		} ), h.createElement( Qt, {
			game: t
		} );
	}

	var on = function ( e ) {
			g.track( 'impression', {
				module: {
					name: e,
					region: 1 < arguments.length && void 0 !== arguments[ 1 ] ? arguments[ 1 ] : '',
					label: 2 < arguments.length && void 0 !== arguments[ 2 ] ? arguments[ 2 ] : '',
					context: 3 < arguments.length && void 0 !== arguments[ 3 ] ? arguments[ 3 ] : ''
				}
			} );
		},
		an = ['handleSubscribe', 'trackInteraction', 'isActive'];

	function cn( t, e ) {
		var n,
			r = Object.keys( t );
		return Object.getOwnPropertySymbols && ( n = Object.getOwnPropertySymbols( t ), e && ( n = n.filter( function ( e ) {
			return Object.getOwnPropertyDescriptor( t, e ).enumerable;
		} ) ), r.push.apply( r, n ) ), r;
	}

	function ln( r ) {
		for ( var e = 1; e < arguments.length; e ++ ) {
			var o = null != arguments[ e ] ? arguments[ e ] : {};
			e % 2 ? cn( Object( o ), !0 ).forEach( function ( e ) {
				var t,
					n;
				t = r, e = o[ n = e ], n in t ? Object.defineProperty( t, n, {
					value: e,
					enumerable: !0,
					configurable: !0,
					writable: !0
				} ) : t[ n ] = e;
			} ) : Object.getOwnPropertyDescriptors ? Object.defineProperties( r, Object.getOwnPropertyDescriptors( o ) ) : cn( Object( o ) ).forEach( function ( e ) {
				Object.defineProperty( r, e, Object.getOwnPropertyDescriptor( o, e ) );
			} );
		}
		return r;
	}

	function un( e, t ) {
		if ( null == e ) {
			return {};
		}
		var n,
			r = function ( e, t ) {
				if ( null == e ) {
					return {};
				}
				var n,
					r,
					o = {},
					a = Object.keys( e );
				for ( r = 0; r < a.length; r ++ ) n = a[ r ], 0 <= t.indexOf( n ) || ( o[ n ] = e[ n ] );
				return o;
			}( e, t );
		if ( Object.getOwnPropertySymbols ) {
			for ( var o = Object.getOwnPropertySymbols( e ), a = 0; a < o.length; a ++ ) n = o[ a ], 0 <= t.indexOf( n ) || Object.prototype.propertyIsEnumerable.call( e, n ) && ( r[ n ] = e[ n ] );
		}
		return r;
	}

	function sn( e ) {
		var t = e.handleSubscribe,
			n = e.trackInteraction,
			r = e.isActive,
			e = ln( ln( {}, un( e, an ) ), {}, {
				buttons: [{
					color: 'secondary',
					variant: 'wide',
					text: 'Today’s Puzzle',
					action: function () {
						t( 'spellingBeeCutoffWelcomeBack' ), n( 'play-subscribe' );
					},
					icon: 'locked'
				}, {
					color: 'primary',
					variant: 'wide',
					text: 'Subscribe',
					action: function () {
						t( 'spellingBeeCutoffWelcomeBack' ), n( 'subscribe-welcome-back' );
					}
				}
				],
				description: {
					text: 'Subscribe to continue playing or come back tomorrow.',
					variant: 'small'
				}
			} );
		return r && on( 'hardpaywall', 'spelling-bee-cutoff-welcome' ), h.createElement( Qt, {
			game: e
		} );
	}

	function fn() {
		var e;
		return window.isHybridWebView && window.NativeBridge ? window.NativeBridge.gamesBackToHub() : window.isPlayTab ? ( ( e = document.createElement( 'a' ) ).href = 'nytimes://play', e.click() ) : window.location.href = '/crosswords', null;
	}

	function mn() {
		return {
			class: 0 < arguments.length && void 0 !== arguments[ 0 ] ? arguments[ 0 ] : ''
		};
	}

	var At = d.connect( function ( e ) {
			var t = e.foundWords,
				n = e.displayDate,
				r = e.editor,
				o = e.userType;
			return {
				wordCount: t.length,
				displayDate: n,
				editor: r,
				userType: o,
				cutoff: Bt( e ),
				hasCompleted: Dt( e )
			};
		}, function ( e ) {
			return {
				unlockGame: function () {
					return e( U() );
				},
				lockGame: function () {
					return e( $() );
				},
				setGameVisible: function () {
					return e( {
						type: W
					} );
				}
			};
		} )( function ( e ) {
			var t = e.wordCount,
				n = e.displayDate,
				r = e.editor,
				o = e.userType,
				a = e.cutoff,
				i = e.momentSystem,
				c = e.isActive,
				l = e.hasCompleted,
				u = e.setGameVisible,
				o = {
					icon: 'spelling-bee',
					title: 'Spelling Bee',
					date: n,
					editor: r,
					bgColor: '$spelling-bee-gold',
					wordCount: t,
					transitionToGame: function () {
						i.transition( 'welcome', l ? 'congrats' : 'game' ).then( function () {
							l ? ( e.lockGame(), g.mobileNavTools.deactivate() ) : ( e.unlockGame(), g.mobileNavTools.activate() ), u();
						} );
					},
					handleSubscribe: dt,
					trackInteraction: J,
					isActive: c,
					userType: o
				};
			return 0 < t ? a ? h.createElement( sn, o ) : h.createElement( rn, o ) : h.createElement( Xt, o );
		} ),
		dn = 'View all games',
		pn = {
			rankImprovement: ['You’re on the up and up! You ranked higher than yesterday.', 'You ranked higher than yesterday. Congrats!'],
			geniusRepeat: ['Genius again! You’re on a roll.', 'Genius, yet again! Well done.', 'Still a Genius! Excellent work.', 'Genius again! No surprise here.', 'Genius ... again?! You’re great at this.']
		},
		yn = function ( e ) {
			var t,
				n = 'Keep it up!';
			switch ( e ) {
				case 'Good Start':
					n = 'Keep it up!';
					break;
				case 'Moving Up':
					n = 'The elevator is all yours.';
					break;
				case 'Good':
					n = 'And it looks great on you.';
					break;
				case 'Solid':
					n = 'You rock.';
					break;
				case 'Nice':
					n = 'And nice people clearly finish first.';
					break;
				case 'Great':
					n = 'We knew you were one of the Greats.';
					break;
				case 'Amazing':
					n = 'Bet you can do it again. Or maybe even better.';
					break;
				case 'Genius':
					t = 'genius';
					break;
				case 'Queen Bee':
					t = 'queen-bee';
					break;
				default:
					t = '';
			}
			return {
				encouragement: n,
				icon: mn( t )
			};
		},
		bn = function ( e ) {
			var t,
				n = mn(),
				r = pn[ e ],
				t = ( t = r, Math.floor( Math.random() * t.length ) );
			return {
				message: h.createElement( 'p', null, r[ t ] ),
				icon: n = 'geniusRepeat' === e ? mn( 'genius' ) : n
			};
		},
		gn = function ( e, t ) {
			t = 'Queen Bee' === e ? h.createElement( 'p', null, 'May your reign last forever, ', h.createElement( 'em', null, e ), '!' ) : 'Genius' === e ? h.createElement( 'p', null, 'You had a stroke of ', h.createElement( 'em', null, e ), ' yesterday.' ) : h.createElement( 'p', null, h.createElement( 'em', null, 'Rank: ', e, '.' ), ' ', t );
			return t;
		},
		vn = function ( e ) {
			var t = e.track,
				n = e.message,
				r = e.icon,
				r = void 0 === r ? {
					class: ''
				} : r,
				e = e.messageType,
				e = void 0 === e ? 'yesterday' : e;
			return h.useEffect( t, [] ), h.createElement( 'div', {
				className: 'sb-modal-'.concat( e, '-rank' )
			}, h.createElement( 'div', {
				className: v( 'sb-modal-rank__icon', r.class )
			} ), n );
		},
		hn = function ( e ) {
			var t = e.forcedRank,
				n = e.messageType,
				r = Ge( Ut ),
				o = Ge( Gt ),
				e = Ge( function ( e ) {
					return e.id;
				} ),
				r = r ? 'Queen Bee' : Ge( $t ),
				a = t || r,
				i = Tt( a );
			if ( !t && ( 0 === o || 'Beginner' === a ) ) {
				return null;
			}
			var c,
				l,
				u,
				s,
				f,
				m = 'SB-'.concat( e );
			return 'yesterday' === n ? ( l = n, u = yn( c = a ), s = u.encouragement, u = u.icon, c = gn( c, s ), s = 'Queen Bee' === a ? 'completed' : a.toLowerCase().split( ' ' ).join( '-' ), f = ''.concat( i, '-' ).concat( s ), h.createElement( vn, {
				icon: u,
				message: c,
				messageType: l,
				track: function () {
					return on( 'stats', 'spelling-bee-yesterday', f, m );
				}
			} ) ) : 'today' === n ? function ( e, t ) {
				if ( 'Genius' === e || 'Queen Bee' === e ) {
					r = 'geniusRepeat';
				} else {
					if ( 'Genius' === e ) {
						return null;
					}
					r = 'rankImprovement';
				}
				var n = 'rankImprovement' === r ? 'higher' : 'genius',
					e = bn( r ),
					r = e.message,
					e = e.icon;
				return h.createElement( vn, {
					icon: e,
					message: r,
					messageType: t,
					track: function () {
						return on( 'congrats-modal', 'spelling-bee', n, m );
					}
				} );
			}( a, n ) : null;
		};

	function wn() {
		return ( wn = Object.assign || function ( e ) {
			for ( var t = 1; t < arguments.length; t ++ ) {
				var n,
					r = arguments[ t ];
				for ( n in r ) Object.prototype.hasOwnProperty.call( r, n ) && ( e[ n ] = r[ n ] );
			}
			return e;
		} ).apply( this, arguments );
	}

	var En = function ( e ) {
			e = e.game;
			return h.createElement( it, {
				bgColor: e.bgColor
			}, h.createElement( 'div', {
				className: 'pz-moment__container alternate'
			}, e.close && h.createElement( et, {
				action: e.close.action
			} ), h.createElement( 'div', {
				className: 'pz-moment__content sequence-animation'
			}, h.createElement( tt, {
				icon: e.icon,
				size: 'large'
			} ), h.createElement( nt, {
				text: e.title,
				size: 'large'
			} ), h.createElement( rt, e.description ), e.celebrationMessage, h.createElement( 'div', {
				className: 'pz-moment__button-wrapper'
			}, ( e.buttons || [] ).map( function ( e, t ) {
				return h.createElement( at, wn( {}, e, {
					key: t
				} ) );
			} ) ), e.bodyText && h.createElement( ot, null, e.bodyText ) ) ) );
		},
		On = m.createContext( {
			getVariant: function () {
				return null;
			},
			reportExposure: function ( e ) {
				return null;
			},
			tests: {}
		} ),
		Sn = function () {
			return m.useContext( On );
		};

	function kn( e, t ) {
		( null == t || t > e.length ) && ( t = e.length );
		for ( var n = 0, r = new Array( t ); n < t; n ++ ) r[ n ] = e[ n ];
		return r;
	}

	var jn,
		_n = [].concat( function ( e ) {
			if ( Array.isArray( e ) ) {
				return kn( e );
			}
		}( jn = kt.map( function ( e ) {
			return e[ 0 ];
		} ) ) || function ( e ) {
			if ( 'undefined' != typeof Symbol && null != e[ Symbol.iterator ] || null != e[ '@@iterator' ] ) {
				return Array.from( e );
			}
		}( jn ) || function ( e, t ) {
			if ( e ) {
				if ( 'string' == typeof e ) {
					return kn( e, t );
				}
				var n = Object.prototype.toString.call( e ).slice( 8, - 1 );
				return 'Map' === ( n = 'Object' === n && e.constructor ? e.constructor.name : n ) || 'Set' === n ? Array.from( e ) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ? kn( e, t ) : void 0;
			}
		}( jn ) || function () {
			throw new TypeError( 'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}(), ['Queen Bee'] ),
		Nn = function ( e ) {
			e = Sn().getVariant( e );
			return {
				variant: e,
				forcedRank: e && decodeURI( e )
			};
		},
		An = ['transitionToGame', 'wordCount', 'score', 'isActive', 'trackInteraction', 'trackImpression', 'navigateBack', 'isHalloween'];

	function Tn( t, e ) {
		var n,
			r = Object.keys( t );
		return Object.getOwnPropertySymbols && ( n = Object.getOwnPropertySymbols( t ), e && ( n = n.filter( function ( e ) {
			return Object.getOwnPropertyDescriptor( t, e ).enumerable;
		} ) ), r.push.apply( r, n ) ), r;
	}

	function Pn( r ) {
		for ( var e = 1; e < arguments.length; e ++ ) {
			var o = null != arguments[ e ] ? arguments[ e ] : {};
			e % 2 ? Tn( Object( o ), !0 ).forEach( function ( e ) {
				var t,
					n;
				t = r, e = o[ n = e ], n in t ? Object.defineProperty( t, n, {
					value: e,
					enumerable: !0,
					configurable: !0,
					writable: !0
				} ) : t[ n ] = e;
			} ) : Object.getOwnPropertyDescriptors ? Object.defineProperties( r, Object.getOwnPropertyDescriptors( o ) ) : Tn( Object( o ) ).forEach( function ( e ) {
				Object.defineProperty( r, e, Object.getOwnPropertyDescriptor( o, e ) );
			} );
		}
		return r;
	}

	function Cn( e, t ) {
		if ( null == e ) {
			return {};
		}
		var n,
			r = function ( e, t ) {
				if ( null == e ) {
					return {};
				}
				var n,
					r,
					o = {},
					a = Object.keys( e );
				for ( r = 0; r < a.length; r ++ ) n = a[ r ], 0 <= t.indexOf( n ) || ( o[ n ] = e[ n ] );
				return o;
			}( e, t );
		if ( Object.getOwnPropertySymbols ) {
			for ( var o = Object.getOwnPropertySymbols( e ), a = 0; a < o.length; a ++ ) n = o[ a ], 0 <= t.indexOf( n ) || Object.prototype.propertyIsEnumerable.call( e, n ) && ( r[ n ] = e[ n ] );
		}
		return r;
	}

	function In( e ) {
		var t = e.transitionToGame,
			n = e.wordCount,
			r = e.score,
			o = e.isActive,
			a = e.trackInteraction,
			i = e.trackImpression,
			c = e.navigateBack,
			l = e.isHalloween,
			u = Cn( e, An ),
			s = Ge( function ( e ) {
				return e.id;
			} ),
			f = 'SB-'.concat( s ),
			e = ( m = Nn( xn ) ).variant,
			s = m.forcedRank,
			m = e === zn,
			m = ( e = s && _n.includes( s ) ) || m;
		return o && !m && i( 'congrats-modal', 'spelling-bee', '', f ), r = Pn( Pn( {}, u ), {}, {
			icon: l ? 'spelling-bee-spooky' : 'spelling-bee-smarty',
			title: 'Genius',
			celebrationMessage: o && m ? h.createElement( hn, {
				messageType: 'today',
				forcedRank: e ? s : null
			} ) : null,
			buttons: [{
				text: 'Keep playing',
				action: function () {
					t();
				}
			}, {
				text: dn,
				color: 'secondary',
				action: function () {
					c(), a( 'back-to-hub', 'genius-modal' );
				}
			}
			],
			description: {
				text: 'You reached the highest rank, with <em>'.concat( n, ' words</em> and <em>' ).concat( r, ' points</em>.' )
			}
		} ), h.createElement( En, {
			game: r
		} );
	}

	var xn = 'GAMES_SB_recap',
		zn = '1_Today_Genius',
		Mn = ['wordCount', 'score', 'trackImpression', 'trackInteraction', 'transitionToGame', 'navigateBack'];

	function Dn( t, e ) {
		var n,
			r = Object.keys( t );
		return Object.getOwnPropertySymbols && ( n = Object.getOwnPropertySymbols( t ), e && ( n = n.filter( function ( e ) {
			return Object.getOwnPropertyDescriptor( t, e ).enumerable;
		} ) ), r.push.apply( r, n ) ), r;
	}

	function Ln( r ) {
		for ( var e = 1; e < arguments.length; e ++ ) {
			var o = null != arguments[ e ] ? arguments[ e ] : {};
			e % 2 ? Dn( Object( o ), !0 ).forEach( function ( e ) {
				var t,
					n;
				t = r, e = o[ n = e ], n in t ? Object.defineProperty( t, n, {
					value: e,
					enumerable: !0,
					configurable: !0,
					writable: !0
				} ) : t[ n ] = e;
			} ) : Object.getOwnPropertyDescriptors ? Object.defineProperties( r, Object.getOwnPropertyDescriptors( o ) ) : Dn( Object( o ) ).forEach( function ( e ) {
				Object.defineProperty( r, e, Object.getOwnPropertyDescriptor( o, e ) );
			} );
		}
		return r;
	}

	function Bn( e, t ) {
		if ( null == e ) {
			return {};
		}
		var n,
			r = function ( e, t ) {
				if ( null == e ) {
					return {};
				}
				var n,
					r,
					o = {},
					a = Object.keys( e );
				for ( r = 0; r < a.length; r ++ ) n = a[ r ], 0 <= t.indexOf( n ) || ( o[ n ] = e[ n ] );
				return o;
			}( e, t );
		if ( Object.getOwnPropertySymbols ) {
			for ( var o = Object.getOwnPropertySymbols( e ), a = 0; a < o.length; a ++ ) n = o[ a ], 0 <= t.indexOf( n ) || Object.prototype.propertyIsEnumerable.call( e, n ) && ( r[ n ] = e[ n ] );
		}
		return r;
	}

	function Rn( e ) {
		var t = e.wordCount,
			n = e.score,
			r = ( e.trackImpression, e.trackInteraction ),
			o = ( e.transitionToGame, e.navigateBack ),
			n = Ln( Ln( {}, Bn( e, Mn ) ), {}, {
				icon: 'spelling-bee-queen',
				title: 'Queen Bee',
				buttons: [{
					text: dn,
					action: function () {
						o(), r( 'back-to-hub', 'completed-modal' );
					}
				}
				],
				description: {
					text: 'You found everything! All <em>'.concat( t, ' words</em> worth <em>' ).concat( n, ' points</em>.' )
				}
			} );
		return h.createElement( En, {
			game: n
		} );
	}

	e = d.connect( function ( e ) {
		return {
			wordCount: e.foundWords.length,
			hasCompleted: Dt( e ),
			isHalloween: /10-31/.test( e.printDate ),
			score: Ot( e )
		};
	}, function ( e ) {
		return {
			unlockGame: function () {
				return e( U() );
			}
		};
	} )( function ( e ) {
		var t = e.wordCount,
			n = e.momentSystem,
			r = e.hasCompleted,
			o = e.isActive,
			a = e.isHalloween,
			i = e.score,
			c = function () {
				n.transition( 'congrats', 'game' ).then( function () {
					e.unlockGame(), g.mobileNavTools.activate();
				} );
			},
			c = {
				bgColor: '$white',
				wordCount: t,
				transitionToGame: c,
				trackInteraction: J,
				trackImpression: on,
				navigateBack: fn,
				isActive: o,
				isHalloween: a,
				score: i,
				screen: 'congrats',
				close: {
					action: c
				}
			};
		return r ? h.createElement( Rn, c ) : h.createElement( In, c );
	} );

	function Wn( e, t ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return e;
			}
		}( e ) || function ( e, t ) {
			var n = null == e ? null : 'undefined' != typeof Symbol && e[ Symbol.iterator ] || e[ '@@iterator' ];
			if ( null != n ) {
				var r,
					o,
					a = [],
					i = !0,
					c = !1;
				try {
					for ( n = n.call( e ); !( i = ( r = n.next() ).done ) && ( a.push( r.value ), !t || a.length !== t ); i = !0 ) ;
				} catch ( e ) {
					c = !0, o = e;
				} finally {
					try {
						i || null == n.return || n.return();
					} finally {
						if ( c ) {
							throw o;
						}
					}
				}
				return a;
			}
		}( e, t ) || function ( e, t ) {
			if ( e ) {
				if ( 'string' == typeof e ) {
					return Gn( e, t );
				}
				var n = Object.prototype.toString.call( e ).slice( 8, - 1 );
				return 'Map' === ( n = 'Object' === n && e.constructor ? e.constructor.name : n ) || 'Set' === n ? Array.from( e ) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ? Gn( e, t ) : void 0;
			}
		}( e, t ) || function () {
			throw new TypeError( 'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function Gn( e, t ) {
		( null == t || t > e.length ) && ( t = e.length );
		for ( var n = 0, r = new Array( t ); n < t; n ++ ) r[ n ] = e[ n ];
		return r;
	}

	var $n,
		Un,
		Hn,
		Fn,
		Vn,
		qn,
		Ct = window.location.origin,
		Ct = ( $n = {
			redirect_uri: encodeURIComponent( Ct + window.location.pathname ),
			response_type: 'cookie',
			client_id: 'games',
			application: 'crosswords'
		}, Object.entries( $n ).reduce( function ( e, t, n ) {
			var r = Wn( t, 2 ),
				t = r[ 0 ],
				r = r[ 1 ],
				n = Object.keys( $n ).length - 1 === n ? '' : '&';
			return ''.concat( e ).concat( t, '=' ).concat( r ).concat( n );
		}, '' ) ),
		Yn = 'https://myaccount.nytimes.com/auth/enter-email?'.concat( Ct ),
		e = ( Un = [{
			name: 'loading',
			Content: function ( e ) {
				var t = Ge( function ( e ) {
						return e.hasLoaded;
					} ),
					t = ft( ft( ft( {}, e ), pt ), {}, {
						hasLoaded: t
					} );
				return h.createElement( ut, t );
			}
		}, {
			name: 'welcome',
			Content: At
		}, {
			name: 'congrats',
			Content: e
		}, {
			name: 'cutoff',
			Content: function ( e ) {
				var t = e.isActive,
					e = {
						bgColor: '$white',
						icon: 'spelling-bee-loved',
						title: 'You’re good at this!',
						buttons: [{
							text: 'Subscribe',
							action: function () {
								dt( 'spellingBeeCutoffStop' ), J( 'subscribe-congrats' );
							}
						}, {
							text: dn,
							color: 'secondary',
							action: function () {
								fn(), J( 'back-to-hub', 'cutoff-modal' );
							}
						}
						],
						bodyText: h.createElement( h.Fragment, null, 'Have a Games subscription?', ' ', h.createElement( 'a', {
							href: function () {
								var e = 0 < arguments.length && void 0 !== arguments[ 0 ] ? arguments[ 0 ] : window,
									t = ( null == e || null === ( t = e.navigationLinks ) || void 0 === t ? void 0 : t.login ) || '';
								return gt( t ) ? t : Yn;
							}(),
							onClick: function ( e ) {
								J( 'login' ), window.isHybridWebView && window.NativeBridge && ( e.preventDefault(), window.NativeBridge.gamesAuthenticateUser( 'login' ).then( function ( e ) {
									if ( !e.success ) {
										throw new Error( e.error );
									}
									window.dispatchEvent( new CustomEvent( 'gamesUserCredentialChanged', {
										detail: e
									} ) );
								} ).catch( function ( e ) {
									console.error( 'Failed to log in user', e );
								} ) );
							}
						}, 'Log in' ), '.' ),
						description: {
							text: 'Know more words? Subscribe to reach our Genius ranking.',
							variant: 'small'
						},
						screen: 'congrats'
					};
				return t && on( 'hardpaywall', 'spelling-bee-cutoff' ), h.createElement( En, {
					game: e
				} );
			}
		}
		], Hn = document.getElementById( 'portal-game-moments' ), Fn = [].concat( Re( Un.map( function ( e ) {
			return e.name;
		} ) ), ['game'] ), Vn = {
			sequencingClass: je
		}, ( qn = function () {
			!function ( e, t ) {
				if ( 'function' != typeof t && null !== t ) {
					throw new TypeError( 'Super expression must either be null or a function' );
				}
				e.prototype = Object.create( t && t.prototype, {
					constructor: {
						value: e,
						writable: !0,
						configurable: !0
					}
				} ), t && Me( e, t );
			}( o, m.Component );
			var e,
				t,
				n,
				r = De( o );

			function o( e ) {
				return function ( e, t ) {
					if ( !( e instanceof t ) ) {
						throw new TypeError( 'Cannot call a class as a function' );
					}
				}( this, o ), ( e = r.call( this, e ) ).state = {
					currentMoment: ''
				}, Vn.load = e.load.bind( Le( e ) ), Vn.getCurrentMoment = e.getCurrentMoment.bind( Le( e ) ), Vn.transition = e.momentTransition.bind( Le( e ) ), Vn.reanimateMoment = function ( t ) {
					le( _e ).then( function () {
						var e = document.getElementById( 'js-hook-pz-moment__'.concat( t ) ).querySelector( '.'.concat( je ) );
						e && Ce( Array.from( e.children ), 200 );
					} );
				}.bind( Le( e ) ), e;
			}

			return e = o, ( t = [{
				key: 'componentDidMount',
				value: function () {
					var e;
					( e = document.getElementById( 'js-hook-pz-moment__game' ) ) && Ae( e, 'pz-moment__frame' );
				}
			}, {
				key: 'componentDidUpdate',
				value: function ( e, t ) {
					var n = this.state.currentMoment,
						r = this.props.onEnter;
					t.currentMoment !== n && r( n );
				}
			}, {
				key: 'getCurrentMoment',
				value: function () {
					return this.state.currentMoment;
				}
			}, {
				key: 'momentTransition',
				value: function ( e, t ) {
					var n = this;
					if ( Fn.includes( e ) && Fn.includes( t ) ) {
						return function ( t, n, e ) {
							var r = document.getElementById( 'js-hook-game-wrapper' ),
								o = t.offsetHeight,
								a = document.querySelector( '.'.concat( ke ) ),
								i = document.querySelectorAll( '.'.concat( Se ) );
							Ne( r, pe, t.style.backgroundColor || 'white' ), Ne( r, se, ve ), Ne( r, fe, ye ), Ne( r, de, ''.concat( o, 'px' ) ), Ne( n, me, ye ), Ne( n, se, he ), Ne( n, ue, 0 ), Ae( n, we ), Ne( t, se, he ), Ne( t, ue, 0 ), Ae( t, Oe ), e && e();
							var c = n.offsetHeight;
							return window.isHybridWebView && Ne( document.body, pe, t.style.backgroundColor || 'white' ), le( _e ).then( function () {
								i.length && Te( i, Se ), Ne( n, me, ge ), Ae( n, Ee );
								var e = n.querySelector( '.'.concat( je ) );
								e && Ce( Array.from( e.children ).concat( a ), 25 ), Pe( r, de, o, c, _e ).then( function () {
									Te( t, we ), Te( t, Oe ), Te( n, Ee ), Ne( r, se, be ), Ne( r, fe, ge ), Ne( r, de, 0 ), Ne( t, se, be ), Ne( n, se, be );
								} );
							} ), new Promise( function ( e ) {
								return setTimeout( e, _e );
							} );
						}( Kn( e ), Kn( t ), function () {
							return n.setState( {
								currentMoment: t
							} );
						} );
					}
					console.error( ''.concat( e, ' or ' ).concat( t, ' is not a registered moment' ) );
				}
			}, {
				key: 'load',
				value: function ( e ) {
					var t;
					Fn.includes( e ) ? ( t = Kn( e ), Ae( t, we ), this.setState( {
						currentMoment: e
					} ) ) : console.error( ''.concat( e, ' is not a registered moment' ) );
				}
			}, {
				key: 'render',
				value: function () {
					var n = this.state.currentMoment,
						r = this.props.contentProps;
					return a.createPortal( h.createElement( h.Fragment, null, Un.map( function ( e ) {
						var t = e.name,
							e = e.Content;
						return h.createElement( 'section', {
							className: 'pz-moment__frame pz-moment__'.concat( t ),
							key: t,
							id: 'js-hook-pz-moment__'.concat( t )
						}, h.createElement( e, xe( {
							momentSystem: Vn,
							isActive: n === t
						}, r ) ) );
					} ) ), Hn );
				}
			}
			] ) && ze( e.prototype, t ), n && ze( e, n ), o;
		}() ).defaultProps = {
			onEnter: function () {
			},
			contentProps: {}
		}, {
			Moments: qn,
			momentSystem: Vn
		} );

	function Kn( e ) {
		return document.getElementById( 'js-hook-pz-moment__'.concat( e ) );
	}

	function Xn( u ) {
		var s;
		return function ( l ) {
			return function ( e ) {
				var t = u.getState(),
					n = l( e );
				if ( e.type === x && ( t.isExpandedWordlist ? nr.interaction.gameplay( 'spelling-bee', 'word-list', ( new Date ).getTime() - s ) : s = ( new Date ).getTime() ), e.type === T ) {
					var r = u.getState(),
						o = xt( t ),
						a = xt( r );
					if ( o < a ) {
						for ( var i = o + 1; i <= a; i += 1 ) {
							var c = kt[ i ][ 0 ];
							nr.interaction.gameplay( 'spelling-bee', 'level-up', ''.concat( i, '-' ).concat( c.replace( ' ', '-' ).toLowerCase() ) );
						}
					}
					r.pangrams.includes( e.payload ) && nr.interaction.gameplay( 'spelling-bee', 'pangram' ), !Dt( t ) && Dt( r ) && nr.interaction.gameplay( 'spelling-bee', 'level-up', ''.concat( xt( r ) + 1, '-completed' ) );
				}
				return n;
			};
		};
	}

	function Zn( a ) {
		return function ( o ) {
			return function ( e ) {
				var t = a.getState(),
					n = o( e );
				if ( e.type === T ) {
					var r = a.getState();
					if ( r.isLocked ) {
						return;
					}
					e = !Mt( t ) && Mt( r ), t = !Dt( t ) && Dt( r );
					Bt( r ) && ( a.dispatch( $() ), setTimeout( function () {
						g.mobileNavTools.deactivate(), tr.transition( 'game', 'cutoff' );
					}, rr ) ), ( e || t ) && ( a.dispatch( $() ), setTimeout( function () {
						g.mobileNavTools.deactivate(), tr.transition( 'game', 'congrats' );
					}, rr ) );
				}
				return n;
			};
		};
	}

	function Qn( o ) {
		return function ( r ) {
			return function ( e ) {
				var t = o.getState(),
					n = Lt( t ).hasXwd,
					t = r( e );
				if ( e.type === L ) {
					e = o.getState();
					if ( Lt( e ).hasXwd && !n ) {
						switch ( tr.getCurrentMoment() ) {
							case 'cutoff':
								o.dispatch( U() ), g.mobileNavTools.activate(), tr.transition( 'cutoff', 'game' );
								break;
							case 'welcome':
								tr.reanimateMoment( 'welcome' );
						}
					}
				}
				return t;
			};
		};
	}

	var Jn = e.Moments,
		er = e.momentSystem,
		tr = er,
		nr = X,
		rr = 450;

	function or( e ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return ar( e );
			}
		}( e ) || function ( e ) {
			if ( 'undefined' != typeof Symbol && null != e[ Symbol.iterator ] || null != e[ '@@iterator' ] ) {
				return Array.from( e );
			}
		}( e ) || function ( e, t ) {
			if ( e ) {
				if ( 'string' == typeof e ) {
					return ar( e, t );
				}
				var n = Object.prototype.toString.call( e ).slice( 8, - 1 );
				return 'Map' === ( n = 'Object' === n && e.constructor ? e.constructor.name : n ) || 'Set' === n ? Array.from( e ) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ? ar( e, t ) : void 0;
			}
		}( e ) || function () {
			throw new TypeError( 'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function ar( e, t ) {
		( null == t || t > e.length ) && ( t = e.length );
		for ( var n = 0, r = new Array( t ); n < t; n ++ ) r[ n ] = e[ n ];
		return r;
	}

	function ir( t, e ) {
		var n,
			r = Object.keys( t );
		return Object.getOwnPropertySymbols && ( n = Object.getOwnPropertySymbols( t ), e && ( n = n.filter( function ( e ) {
			return Object.getOwnPropertyDescriptor( t, e ).enumerable;
		} ) ), r.push.apply( r, n ) ), r;
	}

	function cr( r ) {
		for ( var e = 1; e < arguments.length; e ++ ) {
			var o = null != arguments[ e ] ? arguments[ e ] : {};
			e % 2 ? ir( Object( o ), !0 ).forEach( function ( e ) {
				var t,
					n;
				t = r, e = o[ n = e ], n in t ? Object.defineProperty( t, n, {
					value: e,
					enumerable: !0,
					configurable: !0,
					writable: !0
				} ) : t[ n ] = e;
			} ) : Object.getOwnPropertyDescriptors ? Object.defineProperties( r, Object.getOwnPropertyDescriptors( o ) ) : ir( Object( o ) ).forEach( function ( e ) {
				Object.defineProperty( r, e, Object.getOwnPropertyDescriptor( o, e ) );
			} );
		}
		return r;
	}

	function lr( t, e ) {
		switch ( e.type ) {
			case _:
				return cr( cr( {}, t ), {}, {
					input: [].concat( or( t.input ), [e.payload] )
				} );
			case N:
				return cr( cr( {}, t ), {}, {
					input: t.input.slice( 0, - 1 )
				} );
			case j:
				return cr( cr( {}, t ), {}, {
					outerLetters: ce( t.outerLetters, !0 )
				} );
			case A:
				return cr( cr( {}, t ), {}, {
					input: []
				} );
			case T:
				return cr( cr( {}, t ), {}, {
					foundWords: [].concat( or( t.foundWords ), [e.payload] )
				} );
			case x:
				return cr( cr( {}, t ), {}, {
					isExpandedWordlist: !t.isExpandedWordlist
				} );
			case S:
				return cr( cr( {}, t ), {}, {
					isLocked: !0
				} );
			case k:
				return cr( cr( {}, t ), {}, {
					isLocked: !1
				} );
			case P:
				return cr( cr( {}, t ), {}, {
					message: e.payload
				} );
			case C:
				return cr( cr( {}, t ), {}, {
					message: null
				} );
			case I:
				return cr( cr( {}, t ), {}, {
					input: [],
					message: null
				} );
			case M:
				return cr( cr( {}, t ), {}, {
					foundWords: [].concat( or( t.foundWords ), or( e.payload.filter( function ( e ) {
						return t.answers.includes( e ) && !t.foundWords.includes( e );
					} ) ) )
				} );
			case D:
				return cr( cr( {}, t ), {}, {
					yesterday: cr( cr( {}, t.yesterday ), {}, {
						foundWords: or( e.payload || [] ),
						fetched: !0
					} )
				} );
			case z:
				return cr( cr( {}, t ), {}, {
					foundWords: []
				} );
			case L:
				return cr( cr( {}, t ), {}, {
					userType: cr( cr( {}, t.userType ), e.payload )
				} );
			case B:
				return cr( cr( {}, t ), {}, {
					currentMoment: e.payload
				} );
			case R:
				return cr( cr( {}, t ), {}, {
					hasLoaded: !0
				} );
			case W:
				return cr( cr( {}, t ), {}, {
					isGameVisible: !0
				} );
			case G:
				return cr( cr( {}, t ), {}, {
					stats: Pt
				} );
			default:
				return t;
		}
	}

	function ur( t, e ) {
		var n,
			r = Object.keys( t );
		return Object.getOwnPropertySymbols && ( n = Object.getOwnPropertySymbols( t ), e && ( n = n.filter( function ( e ) {
			return Object.getOwnPropertyDescriptor( t, e ).enumerable;
		} ) ), r.push.apply( r, n ) ), r;
	}

	function sr( r ) {
		for ( var e = 1; e < arguments.length; e ++ ) {
			var o = null != arguments[ e ] ? arguments[ e ] : {};
			e % 2 ? ur( Object( o ), !0 ).forEach( function ( e ) {
				var t,
					n;
				t = r, e = o[ n = e ], n in t ? Object.defineProperty( t, n, {
					value: e,
					enumerable: !0,
					configurable: !0,
					writable: !0
				} ) : t[ n ] = e;
			} ) : Object.getOwnPropertyDescriptors ? Object.defineProperties( r, Object.getOwnPropertyDescriptors( o ) ) : ur( Object( o ) ).forEach( function ( e ) {
				Object.defineProperty( r, e, Object.getOwnPropertyDescriptor( o, e ) );
			} );
		}
		return r;
	}

	var fr,
		e = window,
		mr = 'touchstart',
		dr = 'touchend',
		pr = 'mousedown',
		yr = 'mouseup',
		br = 'mouseout',
		gr = 'addEventListener',
		vr = 'removeEventListener',
		hr = 'push-active',
		wr = !1;
	'function' == typeof e.addEventListener && ( fr = !1, ma = Object.defineProperty( {}, 'passive', {
		get: function () {
			return fr = !0;
		}
	} ), e.addEventListener( 'testPassiveEventSupport', no = function () {
	}, ma ), e.removeEventListener( 'testPassiveEventSupport', no, ma ), wr = fr );

	function Er( t, n, r, o ) {
		function e( e ) {
			wr || e.preventDefault(), l && t.classList.add( hr ), o && !c && ( c = setTimeout( function () {
				i = setInterval( function () {
					n( e );
				}, 90 );
			}, 350 ) ), n( e );
		}

		function a( e ) {
			e.cancelable && e.preventDefault(), l && t.classList.remove( hr ), i = i && clearInterval( i ), c = c && clearTimeout( c ), r && r( e );
		}

		var i,
			c,
			l = !!t.classList;
		return t[ gr ]( mr, e, Sr ), t[ gr ]( pr, e ), t[ gr ]( dr, a ), t[ gr ]( yr, a ), t[ gr ]( br, a ),
			function () {
				i = i && clearInterval( i ), c = c && clearTimeout( c ), t[ vr ]( mr, e, Sr ), t[ vr ]( pr, e ), t[ vr ]( dr, a ), t[ vr ]( yr, a ), t[ vr ]( br, a );
			};
	}

	function Or() {
	}

	var Sr = {
			passive: !0
		},
		e = Math.pow( 3, .5 ),
		kr = 2 * e,
		jr = [
			[0, e],
			[1, 0],
			[3, 0],
			[4, e],
			[3, kr],
			[1, kr]
		].map( function ( e ) {
			return e.map( function ( e ) {
				return 30 * e;
			} ).join();
		} ).join( ' ' ),
		_r = function ( e ) {
			var t = e.activeKey,
				n = void 0 === t ? '' : t,
				r = e.letter,
				o = void 0 === r ? '' : r,
				t = e.type,
				r = void 0 === t ? 'center' : t,
				t = e.onUp,
				a = void 0 === t ? Or : t,
				e = e.onDown,
				i = void 0 === e ? Or : e,
				c = m.useRef( null );
			return m.useEffect( function () {
				if ( c.current ) {
					return Er( c.current, i, a );
				}
			}, [] ), h.createElement( 'svg', {
				className: v( 'hive-cell', r ),
				viewBox: '0 0 '.concat( 120, ' ' ).concat( 30 * kr )
			}, h.createElement( 'polygon', {
				ref: c,
				className: v( 'cell-fill', {
					'push-active': o === n
				} ),
				points: jr,
				stroke: 'white',
				strokeWidth: 7.5
			} ), h.createElement( 'text', {
				className: 'cell-letter',
				x: '50%',
				y: '50%',
				dy: '0.35em'
			}, o ) );
		};

	function Nr( e ) {
		return ( Nr = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function ( e ) {
			return typeof e;
		} : function ( e ) {
			return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
		} )( e );
	}

	function Ar( e, t ) {
		for ( var n = 0; n < t.length; n ++ ) {
			var r = t[ n ];
			r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && ( r.writable = !0 ), Object.defineProperty( e, r.key, r );
		}
	}

	function Tr( e, t ) {
		return ( Tr = Object.setPrototypeOf || function ( e, t ) {
			return e.__proto__ = t, e;
		} )( e, t );
	}

	function Pr( n ) {
		var r = function () {
			if ( 'undefined' == typeof Reflect || !Reflect.construct ) {
				return !1;
			}
			if ( Reflect.construct.sham ) {
				return !1;
			}
			if ( 'function' == typeof Proxy ) {
				return !0;
			}
			try {
				return Boolean.prototype.valueOf.call( Reflect.construct( Boolean, [], function () {
				} ) ), !0;
			} catch ( e ) {
				return !1;
			}
		}();
		return function () {
			var e,
				t = Cr( n );
			return function ( e, t ) {
				{
					if ( t && ( 'object' === Nr( t ) || 'function' == typeof t ) ) {
						return t;
					}
					if ( void 0 !== t ) {
						throw new TypeError( 'Derived constructors may only return object or undefined' );
					}
				}
				return function ( e ) {
					if ( void 0 !== e ) {
						return e;
					}
					throw new ReferenceError( 'this hasn\'t been initialised - super() hasn\'t been called' );
				}( e );
			}( this, r ? ( e = Cr( this ).constructor, Reflect.construct( t, arguments, e ) ) : t.apply( this, arguments ) );
		};
	}

	function Cr( e ) {
		return ( Cr = Object.setPrototypeOf ? Object.getPrototypeOf : function ( e ) {
			return e.__proto__ || Object.getPrototypeOf( e );
		} )( e );
	}

	var Ir = function () {
		!function ( e, t ) {
			if ( 'function' != typeof t && null !== t ) {
				throw new TypeError( 'Super expression must either be null or a function' );
			}
			e.prototype = Object.create( t && t.prototype, {
				constructor: {
					value: e,
					writable: !0,
					configurable: !0
				}
			} ), t && Tr( e, t );
		}( o, m.Component );
		var e,
			t,
			n,
			r = Pr( o );

		function o() {
			return function ( e, t ) {
				if ( !( e instanceof t ) ) {
					throw new TypeError( 'Cannot call a class as a function' );
				}
			}( this, o ), r.apply( this, arguments );
		}

		return e = o, ( t = [{
			key: 'componentDidMount',
			value: function () {
				var e = this.props,
					t = e.onDown,
					n = e.onUp,
					e = e.allowBurst;
				this.unbind = Er( this.button, t, n, e );
			}
		}, {
			key: 'componentDidUpdate',
			value: function ( e ) {
				var t = this.props,
					n = t.onDown,
					r = t.onUp,
					t = t.allowBurst;
				e.onDown === n && e.onUp === r && e.allowBurst === t || ( this.unbind(), this.unbind = Er( this.button, n, r, t ) );
			}
		}, {
			key: 'componentWillUnmount',
			value: function () {
				this.unbind();
			}
		}, {
			key: 'render',
			value: function () {
				var t = this,
					e = this.props,
					n = e.className,
					r = e.children,
					o = e.outerRef;
				return h.createElement( 'div', {
					ref: function ( e ) {
						t.button = e, o && ( o.current = e );
					},
					className: v( n, 'sb-touch-button' )
				}, r );
			}
		}
		] ) && Ar( e.prototype, t ), n && Ar( e, n ), o;
	}();

	function xr( e, t ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return e;
			}
		}( e ) || function ( e, t ) {
			var n = null == e ? null : 'undefined' != typeof Symbol && e[ Symbol.iterator ] || e[ '@@iterator' ];
			if ( null != n ) {
				var r,
					o,
					a = [],
					i = !0,
					c = !1;
				try {
					for ( n = n.call( e ); !( i = ( r = n.next() ).done ) && ( a.push( r.value ), !t || a.length !== t ); i = !0 ) ;
				} catch ( e ) {
					c = !0, o = e;
				} finally {
					try {
						i || null == n.return || n.return();
					} finally {
						if ( c ) {
							throw o;
						}
					}
				}
				return a;
			}
		}( e, t ) || function ( e, t ) {
			if ( e ) {
				if ( 'string' == typeof e ) {
					return zr( e, t );
				}
				var n = Object.prototype.toString.call( e ).slice( 8, - 1 );
				return 'Map' === ( n = 'Object' === n && e.constructor ? e.constructor.name : n ) || 'Set' === n ? Array.from( e ) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ? zr( e, t ) : void 0;
			}
		}( e, t ) || function () {
			throw new TypeError( 'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function zr( e, t ) {
		( null == t || t > e.length ) && ( t = e.length );
		for ( var n = 0, r = new Array( t ); n < t; n ++ ) r[ n ] = e[ n ];
		return r;
	}

	Ir.defaultProps = {
		className: '',
		onDown: function () {
		},
		onUp: function () {
		},
		allowBurst: !1,
		children: null,
		outerRef: null
	};

	function Mr( e, t ) {
		return window.getComputedStyle && parseInt( window.getComputedStyle( e )[ t ] ) || 0;
	}

	function Dr( o ) {
		return function ( e, t ) {
			e( {
				type: P,
				payload: o
			} );
			var n = o.isError ? 1100 : 900,
				r = o.isError ? I : C;
			return le( n ).then( function () {
				t().message && e( {
					type: r
				} );
			} );
		};
	}

	var Lr = function ( e ) {
			function t() {
				var e;
				i && ( e = [l.current, u.current, s.current].reduce( function ( e, t ) {
					return e + ( ( t = t ) ? t.clientWidth + Mr( t, 'marginLeft' ) + Mr( t, 'marginRight' ) : 0 );
				}, 0 ), e = c.current.clientWidth < e, m( e ) );
			}

			var n = e.activeKey,
				r = e.deleteLetter,
				o = e.handleShuffle,
				a = e.submitWord,
				i = e.isVisible,
				c = e.boundingParentRef,
				l = h.useRef(),
				u = h.useRef(),
				s = h.useRef(),
				f = xr( h.useState( !1 ), 2 ),
				e = f[ 0 ],
				m = f[ 1 ];
			return h.useEffect( function () {
				t();
				var e = oe( t );
				return window.addEventListener( 'resize', e ),
					function () {
						return window.removeEventListener( 'resize', e );
					};
			}, [i] ), h.createElement( 'div', {
				className: v( 'hive-actions', {
					vertical: e
				} )
			}, h.createElement( Ir, {
				className: v( 'hive-action', 'hive-action__submit', {
					'action-active': 'submit' === n
				} ),
				onDown: function () {
					return a();
				},
				outerRef: s
			}, 'Enter' ), h.createElement( Ir, {
				allowBurst: !0,
				className: v( 'hive-action', 'hive-action__delete', {
					'action-active': 'delete' === n
				} ),
				onDown: function () {
					return r();
				},
				outerRef: l
			}, 'Delete' ), h.createElement( Ir, {
				className: v( 'hive-action', 'hive-action__shuffle', {
					'action-active': 'shuffle' === n
				} ),
				onDown: function () {
					return o();
				},
				outerRef: u
			} ) );
		},
		Br = function ( n ) {
			return function ( e, t ) {
				t = t();
				t.isLocked || ( 18 < t.input.length ? e( Dr( {
					value: 'Too long',
					isError: !0
				} ) ) : ( t.message && t.message.isError && e( {
					type: I
				} ), e( {
					type: _,
					payload: n
				} ) ) );
			};
		},
		Rr = function () {
			return function ( e, t ) {
				t = t();
				t.isLocked || ( t.message && t.message.isError ? e( {
					type: I
				} ) : e( {
					type: N
				} ) );
			};
		},
		Wr = function ( i ) {
			return function ( e, t ) {
				var n = t();
				if ( !n.isLocked ) {
					var r = i || n.input.join( '' );
					if ( r.length ) {
						if ( window.cheat && r.split( '' ).every( function ( e ) {
							return e === n.centerLetter;
						} ) ) {
							return window.cheat( r.length );
						}
						window.reset && function () {
							var e = 0 < arguments.length && void 0 !== arguments[ 0 ] ? arguments[ 0 ] : [],
								t = 1 < arguments.length && void 0 !== arguments[ 1 ] ? arguments[ 1 ] : [];
							return ne( e ).sort().join() === ne( t ).sort().join();
						}( r.split( '' ), n.outerLetters ) && window.reset();
						var o,
							a,
							t = ( o = n, t = ( a = r ).split( '' ), a.length < 4 ? 'Too short' : t.some( function ( e ) {
								return !o.validLetters.includes( e );
							} ) ? 'Bad letters' : a.includes( o.centerLetter ) ? o.answers.includes( a ) ? o.foundWords.includes( a ) ? 'Already found' : void 0 : 'Not in word list' : 'Missing center letter' );
						t ? e( Dr( {
							value: t,
							isError: !0
						} ) ) : ( e( {
							type: T,
							payload: r
						} ), a = n.pangrams.includes( r ), t = jt( r, a ), r = t, r = a ? 'Pangram!' : 7 <= r ? 'Awesome!' : 1 < r ? 'Nice!' : 'Good!', e( {
							type: A
						} ), e( Dr( {
							value: r,
							points: t,
							isPangram: a
						} ) ) );
					}
				}
			};
		};

	function Gr( e, t ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return e;
			}
		}( e ) || function ( e, t ) {
			var n = null == e ? null : 'undefined' != typeof Symbol && e[ Symbol.iterator ] || e[ '@@iterator' ];
			if ( null != n ) {
				var r,
					o,
					a = [],
					i = !0,
					c = !1;
				try {
					for ( n = n.call( e ); !( i = ( r = n.next() ).done ) && ( a.push( r.value ), !t || a.length !== t ); i = !0 ) ;
				} catch ( e ) {
					c = !0, o = e;
				} finally {
					try {
						i || null == n.return || n.return();
					} finally {
						if ( c ) {
							throw o;
						}
					}
				}
				return a;
			}
		}( e, t ) || function ( e, t ) {
			if ( e ) {
				if ( 'string' == typeof e ) {
					return $r( e, t );
				}
				var n = Object.prototype.toString.call( e ).slice( 8, - 1 );
				return 'Map' === ( n = 'Object' === n && e.constructor ? e.constructor.name : n ) || 'Set' === n ? Array.from( e ) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ? $r( e, t ) : void 0;
			}
		}( e, t ) || function () {
			throw new TypeError( 'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function $r( e, t ) {
		( null == t || t > e.length ) && ( t = e.length );
		for ( var n = 0, r = new Array( t ); n < t; n ++ ) r[ n ] = e[ n ];
		return r;
	}

	var Ur = function ( e ) {
			return new RegExp( '^([a-z]{1}$)' ).test( e );
		},
		Hr = 300;

	function Fr( e ) {
		function t() {
			i( null );
		}

		function n( e ) {
			var t = null;
			e.metaKey || ( 'Backspace' === e.key || 'Delete' === e.key ? ( t = 'delete', e.preventDefault(), s( Rr() ) ) : 'Enter' === e.key ? ( t = 'submit', e.preventDefault(), s( Wr() ) ) : ' ' === e.key ? ( t = 'shuffle', e.preventDefault(), f() ) : ( e = e.key.toLowerCase(), Ur( e ) && s( Br( e ) ) ), i( t ) );
		}

		var r = e.boundingParentRef,
			o = void 0 === r ? {
				current: null
			} : r,
			e = Gr( m.useState( null ), 2 ),
			a = e[ 0 ],
			i = e[ 1 ],
			r = Gr( m.useState( null ), 2 ),
			c = r[ 0 ],
			l = r[ 1 ],
			u = Ge( function ( e ) {
				return e.centerLetter;
			} ),
			e = Ge( function ( e ) {
				return e.outerLetters;
			} ),
			r = Ge( function ( e ) {
				return e.currentMoment;
			} ),
			s = d.useDispatch(),
			f = m.useCallback( function () {
				c || ( l( 'beforeShuffle' ), le( Hr ).then( function () {
					l( 'shuffling' ), s( H() );
				} ).then( function () {
					return le( 10 );
				} ).then( function () {
					return l( 'afterShuffle' );
				} ).then( function () {
					return le( Hr );
				} ).then( function () {
					return l( null );
				} ) );
			}, [c] );
		m.useEffect( function () {
			return window.addEventListener( 'keydown', n, !1 ), window.addEventListener( 'keyup', t, !1 ),
				function () {
					window.removeEventListener( 'keydown', n ), window.removeEventListener( 'keyup', t );
				};
		}, [c] );
		e = [h.createElement( _r, {
			key: u,
			activeKey: a,
			letter: u,
			onDown: function () {
				return s( Br( u ) );
			},
			onUp: t,
			type: 'center'
		} )
		].concat( [e.map( function ( e ) {
			return h.createElement( _r, {
				key: e,
				letter: e,
				activeKey: a,
				onDown: function () {
					return s( Br( e ) );
				},
				onUp: t,
				type: 'outer'
			} );
		} )
		] );
		return h.createElement( h.Fragment, null, h.createElement( 'div', {
			className: 'sb-hive'
		}, h.createElement( 'div', {
			className: v( 'hive', {
				'fade-out': 'beforeShuffle' === c,
				shuffling: 'shuffling' === c,
				'fade-in': 'afterShuffle' === c
			} )
		}, e ) ), h.createElement( Lr, {
			activeKey: a,
			handleShuffle: function () {
				return f();
			},
			submitWord: function () {
				return s( Wr() );
			},
			deleteLetter: function () {
				return s( Rr() );
			},
			isVisible: 'game' === r,
			boundingParentRef: o
		} ) );
	}

	function Vr( e, t ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return e;
			}
		}( e ) || function ( e, t ) {
			var n = null == e ? null : 'undefined' != typeof Symbol && e[ Symbol.iterator ] || e[ '@@iterator' ];
			if ( null != n ) {
				var r,
					o,
					a = [],
					i = !0,
					c = !1;
				try {
					for ( n = n.call( e ); !( i = ( r = n.next() ).done ) && ( a.push( r.value ), !t || a.length !== t ); i = !0 ) ;
				} catch ( e ) {
					c = !0, o = e;
				} finally {
					try {
						i || null == n.return || n.return();
					} finally {
						if ( c ) {
							throw o;
						}
					}
				}
				return a;
			}
		}( e, t ) || Yr( e, t ) || function () {
			throw new TypeError( 'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function qr( e ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return Kr( e );
			}
		}( e ) || function ( e ) {
			if ( 'undefined' != typeof Symbol && null != e[ Symbol.iterator ] || null != e[ '@@iterator' ] ) {
				return Array.from( e );
			}
		}( e ) || Yr( e ) || function () {
			throw new TypeError( 'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function Yr( e, t ) {
		if ( e ) {
			if ( 'string' == typeof e ) {
				return Kr( e, t );
			}
			var n = Object.prototype.toString.call( e ).slice( 8, - 1 );
			return 'Map' === ( n = 'Object' === n && e.constructor ? e.constructor.name : n ) || 'Set' === n ? Array.from( e ) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ? Kr( e, t ) : void 0;
		}
	}

	function Kr( e, t ) {
		( null == t || t > e.length ) && ( t = e.length );
		for ( var n = 0, r = new Array( t ); n < t; n ++ ) r[ n ] = e[ n ];
		return r;
	}

	function Xr() {
		var n = Ge( function ( e ) {
				return e.message;
			} ),
			r = Ge( function ( e ) {
				return e.input;
			} ),
			o = Ge( function ( e ) {
				return e.centerLetter;
			} ),
			e = Ge( function ( e ) {
				return e.outerLetters || [];
			} ),
			a = [o].concat( qr( e ) ),
			i = m.useRef( null ),
			c = m.useRef( null ),
			t = Vr( m.useState( 1 ), 2 ),
			e = t[ 0 ],
			l = t[ 1 ],
			u = ( t = Vr( m.useState( !0 ), 2 ) )[ 0 ],
			s = t[ 1 ];
		return m.useLayoutEffect( function () {
			var e,
				t;
			i.current && c.current && ( e = i.current.getBoundingClientRect().width, t = c.current.getBoundingClientRect().width, l( e < t ? e / t : 1 ) );
		}, [r] ), m.useEffect( function () {
			0 < r.length && s( !1 );
		}, [r] ), t = function ( e, t ) {
			return h.createElement( 'span', {
				className: v( 'sb-hive-input-content', {
					'has-error': n && n.isError,
					'non-empty': 0 < r.length,
					'is-accepting': n && !n.isError
				} ),
				style: {
					fontSize: ''.concat( e, 'em' )
				},
				ref: t
			}, u && !b.isMobile && h.createElement( 'span', {
				className: 'sb-hive-input-placeholder'
			}, 'Type or click' ), r.map( function ( e, t ) {
				return h.createElement( 'span', {
					key: e + t,
					className: v( {
						'sb-input-bright': o === e,
						'sb-input-invalid': !a.includes( e )
					} )
				}, e );
			} ) );
		}, h.createElement( 'div', {
			className: 'sb-hive-input',
			ref: i
		}, t( e ), h.createElement( 'div', {
			className: 'sb-hive-hidden-input'
		}, t( 1, c ) ) );
	}

	function Zr( e ) {
		var t = e.value,
			n = e.centerLetter,
			e = void 0 !== ( e = e.isPangram ) && e,
			r = [],
			t = t.split( n ),
			o = 0;
		return t.forEach( function ( e, t ) {
			o += 1, 0 < t && n && r.push( h.createElement( 'span', {
				key: o,
				className: 'sb-anagram-key'
			}, n ) ), e && r.push( e );
		} ), h.createElement( 'span', {
			className: v( 'sb-anagram', {
				pangram: e
			} )
		}, r );
	}

	function Qr( e ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return to( e );
			}
		}( e ) || function ( e ) {
			if ( 'undefined' != typeof Symbol && null != e[ Symbol.iterator ] || null != e[ '@@iterator' ] ) {
				return Array.from( e );
			}
		}( e ) || eo( e ) || function () {
			throw new TypeError( 'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function Jr( e, t ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return e;
			}
		}( e ) || function ( e, t ) {
			var n = null == e ? null : 'undefined' != typeof Symbol && e[ Symbol.iterator ] || e[ '@@iterator' ];
			if ( null != n ) {
				var r,
					o,
					a = [],
					i = !0,
					c = !1;
				try {
					for ( n = n.call( e ); !( i = ( r = n.next() ).done ) && ( a.push( r.value ), !t || a.length !== t ); i = !0 ) ;
				} catch ( e ) {
					c = !0, o = e;
				} finally {
					try {
						i || null == n.return || n.return();
					} finally {
						if ( c ) {
							throw o;
						}
					}
				}
				return a;
			}
		}( e, t ) || eo( e, t ) || function () {
			throw new TypeError( 'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function eo( e, t ) {
		if ( e ) {
			if ( 'string' == typeof e ) {
				return to( e, t );
			}
			var n = Object.prototype.toString.call( e ).slice( 8, - 1 );
			return 'Map' === ( n = 'Object' === n && e.constructor ? e.constructor.name : n ) || 'Set' === n ? Array.from( e ) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ? to( e, t ) : void 0;
		}
	}

	function to( e, t ) {
		( null == t || t > e.length ) && ( t = e.length );
		for ( var n = 0, r = new Array( t ); n < t; n ++ ) r[ n ] = e[ n ];
		return r;
	}

	var no = function ( e ) {
		function t( e ) {
			var t = c.current.scrollLeft,
				n = c.current.offsetWidth;
			c.current.scrollTo( t + ( 'prev' === e ? - 1 : 1 ) * n, 0 );
		}

		var r,
			o,
			a,
			n = e.words,
			i = e.centerLetter,
			c = h.useRef(),
			l = h.useRef(),
			u = Jr( h.useState( 1 ), 2 ),
			s = u[ 0 ],
			f = u[ 1 ],
			m = Jr( h.useState( 0 ), 2 ),
			d = m[ 0 ],
			p = m[ 1 ],
			e = 1 < s,
			u = e && !b.isMobile,
			m = h.useCallback( ( r = function () {
				var e = Math.round( c.current.scrollLeft / c.current.offsetWidth );
				p( e );
			}, o = 100, function () {
				if ( !a ) {
					for ( var e = arguments.length, t = new Array( e ), n = 0; n < e; n ++ ) t[ n ] = arguments[ n ];
					r.apply( this, t ), a = !0, setTimeout( function () {
						a = !1;
					}, o );
				}
			} ), [] ),
			y = h.useCallback( function () {
				var e,
					t,
					n,
					r;
				l.current ? ( r = c.current.offsetWidth ) && ( e = c.current.scrollLeft, t = c.current.getBoundingClientRect().left, n = l.current.getBoundingClientRect().right, 0 < ( r = Math.ceil( ( n + e - t ) / r ) ) && f( r ) ) : f( 1 );
			}, [f] );
		return h.useEffect( y ), h.useEffect( function () {
			var e = oe( y, 100 );
			return window.addEventListener( 'resize', e ),
				function () {
					return window.removeEventListener( 'resize', e );
				};
		}, [] ), h.createElement( h.Fragment, null, h.createElement( 'div', {
			className: 'sb-wordlist-pag',
			ref: c,
			onScroll: m
		}, Qr( Array( s ) ).map( function ( e, t ) {
			return h.createElement( 'div', {
				key: t.toString(),
				className: 'sb-wordlist-scroll-anchor',
				style: {
					left: ''.concat( 100 * t, '%' )
				}
			} );
		} ), h.createElement( 'ul', {
			className: v( 'sb-wordlist-items-pag', {
				single: 1 === n.length
			} )
		}, n.map( function ( e, t ) {
			return h.createElement( 'li', {
				key: e,
				ref: t === n.length - 1 ? l : void 0
			}, h.createElement( Zr, {
				value: e,
				centerLetter: i
			} ) );
		} ) ) ), h.createElement( 'div', {
			className: 'sb-kebob'
		}, u && h.createElement( 'button', {
			type: 'button',
			onClick: function () {
				return t( 'prev' );
			},
			className: v( 'sb-bob-arrow', 'sb-bob-prev', {
				active: 0 < d
			} )
		}, h.createElement( 'span', {
			className: 'sb-bob-text'
		}, 'Prev' ) ), e && Qr( Array( s ) ).map( function ( e, t ) {
			return h.createElement( 'div', {
				className: v( 'sb-bob', {
					active: t === d
				} ),
				key: t.toString()
			} );
		} ), u && h.createElement( 'button', {
			type: 'button',
			onClick: function () {
				return t( 'next' );
			},
			className: v( 'sb-bob-arrow', 'sb-bob-next', {
				active: d < s - 1
			} )
		}, h.createElement( 'span', {
			className: 'sb-bob-text'
		}, 'Next' ) ) ) );
	};
	no.defaultProps = {
		words: [],
		centerLetter: ''
	};
	var ro = d.connect( function ( e ) {
			return {
				words: e.foundWords.slice().sort( function ( e, t ) {
					return t < e ? 1 : - 1;
				} ),
				centerLetter: e.centerLetter
			};
		} )( no ),
		oo = d.connect( function ( e ) {
			return {
				wordCount: e.foundWords.length,
				recentWords: e.foundWords.slice().reverse(),
				centerLetter: e.centerLetter,
				isExpandedWordlist: e.isExpandedWordlist
			};
		}, function ( e ) {
			return {
				toggleWordlist: function () {
					return e( o() );
				}
			};
		} )( function ( e ) {
			var t = e.wordCount,
				n = e.recentWords,
				r = e.centerLetter,
				o = e.isExpandedWordlist,
				e = e.toggleWordlist;
			return h.createElement( Ir, {
				className: 'sb-wordlist-heading-wrap',
				onDown: e
			}, h.createElement( 'div', {
				className: 'sb-wordlist-summary'
			}, 'You have found ', t, ' ', 1 === t ? 'word' : 'words' ), h.createElement( 'div', {
				className: 'sb-recent-words-wrap'
			}, h.createElement( 'ul', {
				className: v( 'sb-recent-words', {
					'sb-has-words': 0 < n.length
				} )
			}, n.length ? n.map( function ( e ) {
				return h.createElement( 'li', {
					key: e
				}, h.createElement( Zr, {
					value: e,
					centerLetter: r
				} ) );
			} ) : h.createElement( 'li', {
				key: 'none',
				className: 'sb-placeholder-text'
			}, 'Your words …' ) ) ), h.createElement( 'div', {
				className: 'sb-toggle-expand'
			}, h.createElement( 'span', {
				className: v( 'sb-toggle-icon', {
					'sb-toggle-icon-expanded': o
				} )
			} ) ) );
		} );

	function ao( e ) {
		return ( ao = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function ( e ) {
			return typeof e;
		} : function ( e ) {
			return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
		} )( e );
	}

	function io( t, e ) {
		var n,
			r = Object.keys( t );
		return Object.getOwnPropertySymbols && ( n = Object.getOwnPropertySymbols( t ), e && ( n = n.filter( function ( e ) {
			return Object.getOwnPropertyDescriptor( t, e ).enumerable;
		} ) ), r.push.apply( r, n ) ), r;
	}

	function co( r ) {
		for ( var e = 1; e < arguments.length; e ++ ) {
			var o = null != arguments[ e ] ? arguments[ e ] : {};
			e % 2 ? io( Object( o ), !0 ).forEach( function ( e ) {
				var t,
					n;
				t = r, e = o[ n = e ], n in t ? Object.defineProperty( t, n, {
					value: e,
					enumerable: !0,
					configurable: !0,
					writable: !0
				} ) : t[ n ] = e;
			} ) : Object.getOwnPropertyDescriptors ? Object.defineProperties( r, Object.getOwnPropertyDescriptors( o ) ) : io( Object( o ) ).forEach( function ( e ) {
				Object.defineProperty( r, e, Object.getOwnPropertyDescriptor( o, e ) );
			} );
		}
		return r;
	}

	function lo( e, t ) {
		for ( var n = 0; n < t.length; n ++ ) {
			var r = t[ n ];
			r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && ( r.writable = !0 ), Object.defineProperty( e, r.key, r );
		}
	}

	function uo( e, t ) {
		return ( uo = Object.setPrototypeOf || function ( e, t ) {
			return e.__proto__ = t, e;
		} )( e, t );
	}

	function so( n ) {
		var r = function () {
			if ( 'undefined' == typeof Reflect || !Reflect.construct ) {
				return !1;
			}
			if ( Reflect.construct.sham ) {
				return !1;
			}
			if ( 'function' == typeof Proxy ) {
				return !0;
			}
			try {
				return Boolean.prototype.valueOf.call( Reflect.construct( Boolean, [], function () {
				} ) ), !0;
			} catch ( e ) {
				return !1;
			}
		}();
		return function () {
			var e,
				t = mo( n );
			return function ( e, t ) {
				{
					if ( t && ( 'object' === ao( t ) || 'function' == typeof t ) ) {
						return t;
					}
					if ( void 0 !== t ) {
						throw new TypeError( 'Derived constructors may only return object or undefined' );
					}
				}
				return fo( e );
			}( this, r ? ( e = mo( this ).constructor, Reflect.construct( t, arguments, e ) ) : t.apply( this, arguments ) );
		};
	}

	function fo( e ) {
		if ( void 0 === e ) {
			throw new ReferenceError( 'this hasn\'t been initialised - super() hasn\'t been called' );
		}
		return e;
	}

	function mo( e ) {
		return ( mo = Object.setPrototypeOf ? Object.getPrototypeOf : function ( e ) {
			return e.__proto__ || Object.getPrototypeOf( e );
		} )( e );
	}

	function po() {
	}

	var yo = function () {
		var e = 0 < arguments.length && void 0 !== arguments[ 0 ] ? arguments[ 0 ] : {},
			t = 1 < arguments.length && void 0 !== arguments[ 1 ] ? arguments[ 1 ] : document.documentElement,
			n = Object.entries( window.abra.tests ).map( function ( e ) {
				return e.join( '=' );
			} ).join( ',' );
		return ['Hybrid summary:', 'Platform: '.concat( window.newsreaderAppPlatform ? 'News App' : 'XW App' ), 'Viewport Size: '.concat( t.clientWidth, ' x ' ).concat( t.clientHeight ), 'Logged In: '.concat( e.isLoggedIn ? 'Yes' : 'No' ), 'Xwd: '.concat( e.hasXwd ? 'Yes' : 'No' ), 'Regi: '.concat( e.regiId ), 'NYTS: '.concat( e.nytsCookie ? 'Yes' : 'No' ), 'Web Version: '.concat( window.env.version ), 'Flags: '.concat( n )].join( '\n' );
	};

	function bo( e, t ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return e;
			}
		}( e ) || function ( e, t ) {
			var n = null == e ? null : 'undefined' != typeof Symbol && e[ Symbol.iterator ] || e[ '@@iterator' ];
			if ( null != n ) {
				var r,
					o,
					a = [],
					i = !0,
					c = !1;
				try {
					for ( n = n.call( e ); !( i = ( r = n.next() ).done ) && ( a.push( r.value ), !t || a.length !== t ); i = !0 ) ;
				} catch ( e ) {
					c = !0, o = e;
				} finally {
					try {
						i || null == n.return || n.return();
					} finally {
						if ( c ) {
							throw o;
						}
					}
				}
				return a;
			}
		}( e, t ) || function ( e, t ) {
			if ( e ) {
				if ( 'string' == typeof e ) {
					return go( e, t );
				}
				var n = Object.prototype.toString.call( e ).slice( 8, - 1 );
				return 'Map' === ( n = 'Object' === n && e.constructor ? e.constructor.name : n ) || 'Set' === n ? Array.from( e ) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ? go( e, t ) : void 0;
			}
		}( e, t ) || function () {
			throw new TypeError( 'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function go( e, t ) {
		( null == t || t > e.length ) && ( t = e.length );
		for ( var n = 0, r = new Array( t ); n < t; n ++ ) r[ n ] = e[ n ];
		return r;
	}

	function vo( e ) {
		var t = void 0 === ( i = e.subject ) ? '' : i,
			n = void 0 === ( r = e.href ) ? '' : r,
			r = void 0 === ( i = e.children ) ? '' : i,
			o = void 0 === ( i = e.type ) ? Oo : i,
			a = void 0 === ( i = e.user ) ? {} : i,
			i = ( e = bo( m.useState( 'mailto:nytgames@nytimes.com' ), 2 ) )[ 0 ],
			c = e[ 1 ];
		return m.useEffect( function () {
			g.getFeedbackLink( t ).then( c );
		}, [] ), e = n && t ? t : '', i = n ? ''.concat( n, '?subject=' ).concat( e ) : i, h.createElement( 'a', {
			rel: 'noopener noreferrer',
			target: '_blank',
			href: i,
			onClick: function ( e ) {
				window.isHybridWebView && window.NativeBridge && ( e.preventDefault(), window.NativeBridge.gamesSendEmail( {
					type: o,
					debugInfo: yo( a )
				} ) );
			}
		}, r );
	}

	function ho( e ) {
		return e = e.children, h.createElement( 'div', {
			className: 'sb-modal-header'
		}, e );
	}

	function wo( e ) {
		return e = e.children, h.createElement( 'div', {
			className: 'sb-modal-body'
		}, e );
	}

	var Eo = 'suggest',
		Oo = 'feedback';

	function So( e, t ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return e;
			}
		}( e ) || function ( e, t ) {
			var n = null == e ? null : 'undefined' != typeof Symbol && e[ Symbol.iterator ] || e[ '@@iterator' ];
			if ( null != n ) {
				var r,
					o,
					a = [],
					i = !0,
					c = !1;
				try {
					for ( n = n.call( e ); !( i = ( r = n.next() ).done ) && ( a.push( r.value ), !t || a.length !== t ); i = !0 ) ;
				} catch ( e ) {
					c = !0, o = e;
				} finally {
					try {
						i || null == n.return || n.return();
					} finally {
						if ( c ) {
							throw o;
						}
					}
				}
				return a;
			}
		}( e, t ) || function ( e, t ) {
			if ( e ) {
				if ( 'string' == typeof e ) {
					return ko( e, t );
				}
				var n = Object.prototype.toString.call( e ).slice( 8, - 1 );
				return 'Map' === ( n = 'Object' === n && e.constructor ? e.constructor.name : n ) || 'Set' === n ? Array.from( e ) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ? ko( e, t ) : void 0;
			}
		}( e, t ) || function () {
			throw new TypeError( 'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function ko( e, t ) {
		( null == t || t > e.length ) && ( t = e.length );
		for ( var n = 0, r = new Array( t ); n < t; n ++ ) r[ n ] = e[ n ];
		return r;
	}

	var jo,
		_o,
		No,
		Ao,
		To,
		Po = ( jo = {
			help: function () {
				var e = Ge( function ( e ) {
						return e.userType;
					} ),
					t = Sn().getVariant( 'GAMES_SB_tips' );
				return h.createElement( h.Fragment, null, h.createElement( ho, null, h.createElement( 'h3', {
					className: 'sb-modal-title'
				}, 'How to Play Spelling Bee' ), h.createElement( 'h4', {
					className: 'sb-modal-subtitle'
				}, 'Create words using letters from the hive.' ) ), h.createElement( wo, null, h.createElement( 'ul', {
					className: 'sb-modal-list'
				}, h.createElement( 'li', null, 'Words must contain at least 4 letters.' ), h.createElement( 'li', null, 'Words must include the center letter.' ), h.createElement( 'li', null, 'Our word list does not include words that are obscure, hyphenated, or proper nouns.' ), h.createElement( 'li', null, 'No cussing either, sorry.' ), h.createElement( 'li', null, 'Letters can be used more than once.' ) ), h.createElement( 'h4', {
					className: 'sb-modal-heading'
				}, 'Score points to increase your rating.' ), h.createElement( 'ul', {
					className: 'sb-modal-list'
				}, h.createElement( 'li', null, '4-letter words are worth 1 point each.' ), h.createElement( 'li', null, 'Longer words earn 1 point per letter.' ), h.createElement( 'li', null, 'Each puzzle includes at least one “pangram” which uses every letter. These are worth 7 extra points!' ) ), '1_TipsAndTricks' === t && h.createElement( 'p', {
					className: 'sb-modal-message'
				}, 'Need more solving tips?', ' ', h.createElement( 'a', {
					href: 'https://www.nytimes.com/2021/12/09/crosswords/spellingbee-tips.html',
					target: window.isHybridWebView ? '_self' : '_blank',
					rel: 'noreferrer',
					onClick: function () {
						X.interaction.general( 'spelling-bee', 'tips-and-tricks', 'help' );
					}
				}, 'This article can help.' ) ), h.createElement( 'p', {
					className: 'sb-modal-message'
				}, 'New puzzles are released daily at 3 a.m. ET.' ), h.createElement( 'p', {
					className: 'sb-modal-message'
				}, 'Think we missed a word? Email us at', ' ', h.createElement( vo, {
					subject: 'Spelling Bee Word Suggestion',
					href: 'mailto:buzzwords@nytimes.com',
					type: Eo,
					user: e
				}, 'buzzwords@nytimes.com' ), '.' ), h.createElement( 'p', {
					className: 'sb-modal-message'
				}, 'Have feedback? Email us at ', h.createElement( vo, {
					subject: 'Spelling Bee Feedback',
					type: Oo,
					user: e
				}, 'nytgames@nytimes.com' ), '.' ) ) );
			},
			ranks: function () {
				var e = Ge( It ),
					t = Ge( function ( e ) {
						return e.userType;
					} );
				return h.createElement( h.Fragment, null, h.createElement( ho, null, h.createElement( 'h3', {
					className: 'sb-modal-title'
				}, 'Rankings' ), h.createElement( 'p', {
					className: 'sb-modal-message'
				}, 'Ranks are based on a percentage of possible points in a puzzle. The minimum scores to reach each rank for today’s are:' ) ), h.createElement( wo, null, h.createElement( 'ol', {
					className: 'sb-modal-list'
				}, e.map( function ( e ) {
					var t = e.minScore,
						e = e.title;
					return h.createElement( 'li', {
						key: e
					}, h.createElement( 'span', {
						className: 'sb-modal-rank'
					}, e ), ' (', t, ')' );
				} ) ), h.createElement( 'p', {
					className: 'sb-modal-message'
				}, 'Think we missed a word? Email us at', ' ', h.createElement( vo, {
					href: 'mailto:buzzwords@nytimes.com',
					subject: 'Spelling Bee Word Suggestion',
					type: Eo,
					user: t
				}, 'buzzwords@nytimes.com' ), '.' ), h.createElement( 'p', {
					className: 'sb-modal-message'
				}, 'Have feedback? Email us at ', h.createElement( vo, {
					subject: 'Spelling Bee Feedback',
					type: Oo,
					user: t
				}, 'nytgames@nytimes.com' ), '.' ) ) );
			},
			yesterday: function () {
				var e = Ge( function ( e ) {
						return e.yesterday;
					} ),
					t = e.displayDate,
					n = e.centerLetter,
					r = e.validLetters,
					o = e.answers,
					a = Ge( St ),
					i = Ge( Rt ),
					c = Ge( Wt ),
					l = Nn( 'GAMES_SB_rank' ),
					u = l.variant,
					e = l.forcedRank,
					l = a && 1 <= a.length && '1_Yesterday' === u,
					u = e && _n.includes( e ),
					l = l || u,
					s = d.useDispatch();
				return m.useEffect( function () {
					window.isHybridWebView && null === a && s( function ( t, e ) {
						var n = e(),
							e = n.yesterday.id,
							n = n.userType.nytsCookie;
						w( e, n ).then( function ( e ) {
							e && t( V( e ) );
						} );
					} );
				}, [a] ), h.createElement( h.Fragment, null, h.createElement( ho, null, h.createElement( 'h3', {
					className: 'sb-modal-title'
				}, 'Yesterday’s Answers' ), h.createElement( 'div', {
					className: 'sb-modal-date__yesterday'
				}, t ) ), h.createElement( wo, null, l && h.createElement( hn, {
					messageType: 'yesterday',
					forcedRank: u ? e : null
				} ), h.createElement( 'div', {
					className: 'sb-modal-letters'
				}, r ), h.createElement( 'ul', {
					className: 'sb-modal-wordlist-items'
				}, o.map( function ( e ) {
					return h.createElement( 'li', {
						key: e,
						'data-testid': 'yesterdays-answer-word'
					}, h.createElement( 'span', {
						className: v( 'check', {
							checked: i.has( e )
						} )
					} ), h.createElement( Zr, {
						value: e,
						centerLetter: n,
						isPangram: c.has( e )
					} ) );
				} ) ) ) );
			},
			stats: function () {
				var e = Ge( function ( e ) {
						return e.stats;
					} ),
					t = d.useDispatch();
				return m.useEffect( function () {
					var n;
					t( ( n = 'start_date=2022-01-15&end_date=2022-02-24', function ( e, t ) {
						t().userType.regiId, e( q( n ) );
					} ) );
				}, [] ), h.createElement( h.Fragment, null, h.createElement( ho, null, h.createElement( 'h3', {
					className: 'sb-modal-title'
				}, 'Statistics' ), h.createElement( 'h4', {
					className: 'sb-modal-subtitle'
				}, 'Weekly Recap' ) ), h.createElement( wo, null, e && e.length && h.createElement( 'div', null, h.createElement( 'ul', null, null === ( e = e[ 0 ].score_type ) || void 0 === e ? void 0 : e.map( function ( e ) {
					return h.createElement( 'li', {
						key: e.id
					}, 'On', ' ', new Date( e.updated_at ).toLocaleString( 'en-us', {
						weekday: 'long'
					} ), ' ', 'you got ', e.value, ' points. ', e.label, '!' );
				} ) ) ) ) );
			}
		}, _o = function ( e ) {
			function t() {
				l.current && c( l.current.scrollTop + l.current.offsetHeight < l.current.scrollHeight );
			}

			var n = e.children,
				r = e.toggleModal,
				o = e.modalType,
				a = h.createElement( 'div', {
					className: 'sb-modal-top'
				}, h.createElement( 'div', {
					role: 'button',
					className: 'sb-modal-close',
					onClick: function () {
						return r();
					}
				}, '×' ) ),
				i = So( h.useState( !1 ), 2 ),
				e = i[ 0 ],
				c = i[ 1 ],
				l = h.useRef( null );
			return h.useEffect( function () {
				var e;
				return t(), null !== ( e = l.current ) && void 0 !== e && e.addEventListener( 'scroll', t ),
					function () {
						var e;
						null !== ( e = l.current ) && void 0 !== e && e.removeEventListener( 'scroll', t );
					};
			}, [] ), h.createElement( 'div', {
				role: 'button',
				className: v( 'sb-modal-frame', o ),
				onClick: function ( e ) {
					return e.stopPropagation();
				}
			}, a, h.createElement( 'div', {
				ref: l,
				className: v( 'sb-modal-content', {
					'has-overflow': e
				} )
			}, n ) );
		}, No = document.getElementById( 'portal-game-modals' ), Ao = {
			toggleModal: po,
			getCurrentModal: function () {
				return null;
			}
		}, To = function () {
			!function ( e, t ) {
				if ( 'function' != typeof t && null !== t ) {
					throw new TypeError( 'Super expression must either be null or a function' );
				}
				e.prototype = Object.create( t && t.prototype, {
					constructor: {
						value: e,
						writable: !0,
						configurable: !0
					}
				} ), t && uo( e, t );
			}( o, m.Component );
			var e,
				t,
				n,
				r = so( o );

			function o( e ) {
				var t;
				return function ( e, t ) {
					if ( !( e instanceof t ) ) {
						throw new TypeError( 'Cannot call a class as a function' );
					}
				}( this, o ), ( t = r.call( this, e ) ).state = {
					currentModal: e.initialModal || null,
					isOpen: !!e.initialModal,
					isClosing: !1,
					hasAnimatedIn: !1
				}, Ao.toggleModal = t.toggleModal.bind( fo( t ) ), Ao.getCurrentModal = t.getCurrentModal.bind( fo( t ) ), t.enqueueStates = t.enqueueStates.bind( fo( t ) ), t.handleScrimClick = t.handleScrimClick.bind( fo( t ) ), t;
			}

			return e = o, ( t = [{
				key: 'handleScrimClick',
				value: function () {
					this.state.hasAnimatedIn && Ao.toggleModal();
				}
			}, {
				key: 'getCurrentModal',
				value: function () {
					return this.state.currentModal || null;
				}
			}, {
				key: 'enqueueStates',
				value: function ( e ) {
					var t = this,
						n = 1 < arguments.length && void 0 !== arguments[ 1 ] ? arguments[ 1 ] : 150,
						r = 2 < arguments.length && void 0 !== arguments[ 2 ] ? arguments[ 2 ] : 0;
					e[ r ] && setTimeout( function () {
						t.setState( co( {}, e[ r ] ), function () {
							return t.enqueueStates( e, n, r + 1 );
						} );
					}, r ? n : 0 );
				}
			}, {
				key: 'toggleModal',
				value: function ( e, t ) {
					var n = this.state,
						r = n.isOpen,
						o = n.currentModal,
						a = this.props,
						n = a.onOpen,
						a = a.onClose,
						e = 'string' == typeof e && e;
					e ? ( n && n( e, t ), r ? this.setState( {
						currentModal: e
					} ) : this.enqueueStates( [{}, {
						isOpen: !0,
						currentModal: e
					}, {
						hasAnimatedIn: !0
					}
					] ) ) : ( a && a( o, t ), this.enqueueStates( [{
						isClosing: !0,
						hasAnimatedIn: !1
					}, {
						isClosing: !1,
						isOpen: !1,
						currentModal: null
					}
					] ) );
				}
			}, {
				key: 'render',
				value: function () {
					var e = this.state,
						t = e.isOpen,
						n = e.isClosing,
						r = e.currentModal,
						e = r && jo[ r ] || null;
					return No ? a.createPortal( h.createElement( 'div', {
						className: v( 'sb-modal-system', {
							'sb-modal-open': t,
							'sb-modal-closing': n
						} )
					}, h.createElement( 'div', {
						role: 'presentation',
						className: 'sb-modal-scrim',
						onClick: this.handleScrimClick
					}, h.createElement( 'div', {
						className: 'sb-modal-wrapper'
					}, r && e && h.createElement( _o, {
						key: r,
						toggleModal: Ao.toggleModal,
						modalType: r
					}, h.createElement( e, {
						toggleModal: Ao.toggleModal,
						modalType: r
					} ) ) ) ) ), No ) : null;
				}
			}
			] ) && lo( e.prototype, t ), n && lo( e, n ), o;
		}(), Ao.Modals = To, Ao.ModalButton = function ( e ) {
			var t = e.modal,
				n = e.children,
				r = e.className,
				o = e.triggerName;
			return h.createElement( 'span', {
				role: 'presentation',
				className: r,
				onClick: function () {
					Ao.toggleModal( t, o );
				}
			}, n );
		}, Ao ),
		Co = function ( e, t ) {
			return Po.toggleModal( e, t );
		},
		Io = Po.Modals,
		xo = Po.ModalButton,
		zo = d.connect( function ( e ) {
			return {
				score: Ot( e ),
				ranks: It( e ),
				rankIdx: xt( e ),
				rank: zt( e )
			};
		} )( function ( e ) {
			var t = e.score,
				n = e.rank,
				r = e.rankIdx,
				e = e.ranks;
			return h.createElement( xo, {
				modal: 'ranks',
				triggerName: 'in-game'
			}, h.createElement( 'div', {
				className: 'sb-progress',
				title: 'Click to see today’s ranks'
			}, h.createElement( 'h4', {
				className: 'sb-progress-rank'
			}, n ), h.createElement( 'div', {
				className: 'sb-progress-bar'
			}, h.createElement( 'div', {
				className: 'sb-progress-line'
			}, h.createElement( 'div', {
				className: 'sb-progress-dots'
			}, e.map( function ( e, t ) {
				return h.createElement( 'span', {
					key: t,
					className: v( 'sb-progress-dot', {
						completed: t < r
					} )
				} );
			} ) ) ), h.createElement( 'div', {
				className: v( 'sb-progress-marker', {
					final: r === e.length - 1
				} ),
				style: {
					left: ''.concat( r / ( e.length - 1 ) * 100, '%' )
				}
			}, h.createElement( 'span', {
				className: 'sb-progress-value'
			}, t ) ) ) ) );
		} ),
		Mo = d.connect( function ( e ) {
			return {
				message: e.message
			};
		} )( function ( e ) {
			e = e.message;
			return h.createElement( 'div', {
				className: v( 'sb-message-box', {
					'error-message': e && e.isError,
					'success-message': e && !e.isError,
					'pangram-message': e && e.isPangram
				} )
			}, e && h.createElement( 'span', {
				className: 'sb-message'
			}, e.value ), e && e.points && h.createElement( 'span', {
				className: 'sb-message-points'
			}, '+', e.points ) );
		} );

	function Do( e, t ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return e;
			}
		}( e ) || function ( e, t ) {
			var n = null == e ? null : 'undefined' != typeof Symbol && e[ Symbol.iterator ] || e[ '@@iterator' ];
			if ( null != n ) {
				var r,
					o,
					a = [],
					i = !0,
					c = !1;
				try {
					for ( n = n.call( e ); !( i = ( r = n.next() ).done ) && ( a.push( r.value ), !t || a.length !== t ); i = !0 ) ;
				} catch ( e ) {
					c = !0, o = e;
				} finally {
					try {
						i || null == n.return || n.return();
					} finally {
						if ( c ) {
							throw o;
						}
					}
				}
				return a;
			}
		}( e, t ) || function ( e, t ) {
			if ( e ) {
				if ( 'string' == typeof e ) {
					return Lo( e, t );
				}
				var n = Object.prototype.toString.call( e ).slice( 8, - 1 );
				return 'Map' === ( n = 'Object' === n && e.constructor ? e.constructor.name : n ) || 'Set' === n ? Array.from( e ) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ? Lo( e, t ) : void 0;
			}
		}( e, t ) || function () {
			throw new TypeError( 'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function Lo( e, t ) {
		( null == t || t > e.length ) && ( t = e.length );
		for ( var n = 0, r = new Array( t ); n < t; n ++ ) r[ n ] = e[ n ];
		return r;
	}

	var Bo = function ( e ) {
			function t() {
				i( !a );
			}

			var n = e.buttonLabel,
				r = e.children,
				o = Do( m.useState( !1 ), 2 ),
				a = o[ 0 ],
				i = o[ 1 ],
				e = m.useRef( null ),
				o = v( 'pz-dropdown__arrow', {
					reverse: a
				} );
			return h.createElement( 'div', {
				className: 'pz-dropdown'
			}, h.createElement( 'button', {
				type: 'button',
				onClick: t,
				onKeyDown: function ( e ) {
					'Enter' === e.key && t();
				},
				className: 'pz-dropdown__button'
			}, h.createElement( 'span', {
				className: 'pz-dropdown__label'
			}, n ), h.createElement( 'span', {
				className: o
			} ) ), a && h.createElement( 'nav', {
				ref: e,
				className: 'pz-dropdown__list'
			}, h.createElement( 'ul', null, h.Children.map( r, function ( e ) {
				if ( e ) {
					return h.cloneElement( e, {
						menuToggle: t
					} );
				}
			} ) ) ) );
		},
		Ro = function ( e ) {
			e = e.icon;
			return e ? h.createElement( 'i', {
				className: 'pz-toolbar-icon '.concat( e )
			} ) : null;
		},
		Wo = function ( e ) {
			var t = e.type,
				n = e.value,
				r = e.buttonAction,
				o = e.url,
				a = e.icon,
				i = e.menuToggle,
				e = function () {
					r && r(), i && i();
				};
			return h.createElement( h.Fragment, null, h.createElement( 'li', {
				key: n,
				className: 'pz-dropdown__menu-item'
			}, 'button' === t && h.createElement( 'button', {
				type: 'button',
				onClick: e,
				className: 'pz-dropdown__button'
			}, n, a && h.createElement( Ro, {
				icon: a
			} ) ), 'navigation' === t && h.createElement( 'a', {
				href: o,
				target: '_blank',
				rel: 'noreferrer',
				onClick: e,
				className: 'pz-dropdown__button'
			}, n, a && h.createElement( Ro, {
				icon: a
			} ) ) ) );
		};

	function Go( e, t ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return e;
			}
		}( e ) || function ( e, t ) {
			var n = null == e ? null : 'undefined' != typeof Symbol && e[ Symbol.iterator ] || e[ '@@iterator' ];
			if ( null != n ) {
				var r,
					o,
					a = [],
					i = !0,
					c = !1;
				try {
					for ( n = n.call( e ); !( i = ( r = n.next() ).done ) && ( a.push( r.value ), !t || a.length !== t ); i = !0 ) ;
				} catch ( e ) {
					c = !0, o = e;
				} finally {
					try {
						i || null == n.return || n.return();
					} finally {
						if ( c ) {
							throw o;
						}
					}
				}
				return a;
			}
		}( e, t ) || function ( e, t ) {
			if ( e ) {
				if ( 'string' == typeof e ) {
					return $o( e, t );
				}
				var n = Object.prototype.toString.call( e ).slice( 8, - 1 );
				return 'Map' === ( n = 'Object' === n && e.constructor ? e.constructor.name : n ) || 'Set' === n ? Array.from( e ) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ? $o( e, t ) : void 0;
			}
		}( e, t ) || function () {
			throw new TypeError( 'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function $o( e, t ) {
		( null == t || t > e.length ) && ( t = e.length );
		for ( var n = 0, r = new Array( t ); n < t; n ++ ) r[ n ] = e[ n ];
		return r;
	}

	function Uo( e ) {
		var t = e.printDate,
			e = Sn().getVariant( Ho ) === Fo;
		return g.mobileNavTools.create( [e && {
			type: 'text',
			value: 'Stats',
			action: function () {
				return Co( 'stats', 'toolbar' );
			}
		}, {
			type: 'text',
			value: 'Yesterday',
			action: function () {
				return Co( 'yesterday', 'toolbar' );
			}
		}, g.mobileNavTools.createDropDown( {
			value: 'More',
			items: [{
				type: 'button',
				value: 'How to Play',
				action: function () {
					return Co( 'help', 'toolbar' );
				}
			}, {
				type: 'button',
				value: 'Rankings',
				action: function () {
					return Co( 'ranks', 'toolbar' );
				}
			}, {
				type: 'navigation',
				value: 'Today’s Hints',
				url: ''.concat( Vo( t ) ),
				action: function () {
					qo( 'todays-hints' );
				},
				icon: 'external'
			}, {
				type: 'navigation',
				value: 'Community',
				url: ''.concat( Vo( t ), '#commentsContainer' ),
				action: function () {
					qo( 'community' );
				},
				icon: 'external'
			}
			]
		} )
		] ), b.isMobile ? null : a.createPortal( h.createElement( h.Fragment, null, h.createElement( 'div', {
			className: 'pz-toolbar-left'
		} ), h.createElement( 'div', {
			className: 'pz-toolbar-right'
		}, e && h.createElement( xo, {
			className: 'pz-toolbar-button pz-toolbar-button__stats',
			modal: 'stats',
			triggerName: 'toolbar'
		}, 'Stats' ), h.createElement( xo, {
			className: 'pz-toolbar-button pz-toolbar-button__yesterday',
			modal: 'yesterday',
			triggerName: 'toolbar'
		}, 'Yesterday’s Answers' ), h.createElement( 'a', {
			className: 'pz-toolbar-button pz-toolbar-button__hints',
			href: Vo( t ),
			target: window.isHybridWebView ? '_self' : '_blank',
			rel: 'noreferrer',
			onClick: function () {
				return qo( 'todays-hints' );
			}
		}, 'Today’s Hints', h.createElement( Ro, {
			icon: 'external'
		} ) ), h.createElement( Bo, {
			buttonLabel: 'More'
		}, h.createElement( Wo, {
			type: 'button',
			value: 'How to Play',
			buttonAction: function () {
				return Co( 'help', 'toolbar' );
			}
		} ), h.createElement( Wo, {
			type: 'button',
			value: 'Rankings',
			buttonAction: function () {
				return Co( 'ranks', 'toolbar' );
			}
		} ), h.createElement( Wo, {
			type: 'navigation',
			value: 'Community',
			url: ''.concat( Vo( t ), '#commentsContainer' ),
			buttonAction: function () {
				return qo( 'community' );
			},
			icon: 'external'
		} ) ) ) ), Yo );
	}

	var Ho = 'GAMES_SB_stats',
		Fo = '1_Weekly_Stats',
		Vo = function ( e ) {
			var t = Go( e.split( '-' ), 3 ),
				n = t[ 0 ],
				r = t[ 1 ],
				e = t[ 2 ],
				t = function ( e ) {
					return 'string' == typeof e && '' !== e;
				};
			return t( n ) && t( r ) && t( e ) ? 'https://www.nytimes.com/'.concat( n, '/' ).concat( r, '/' ).concat( e, '/crosswords/spelling-bee-forum.html' ) : 'https://www.nytimes.com/spotlight/spelling-bee-forum';
		},
		qo = function ( e ) {
			return X.interaction.general( 'spelling-bee', e, 'toolbar' );
		},
		Yo = document.getElementById( 'portal-game-toolbar' );

	function Ko( e, t ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return e;
			}
		}( e ) || function ( e, t ) {
			var n = null == e ? null : 'undefined' != typeof Symbol && e[ Symbol.iterator ] || e[ '@@iterator' ];
			if ( null != n ) {
				var r,
					o,
					a = [],
					i = !0,
					c = !1;
				try {
					for ( n = n.call( e ); !( i = ( r = n.next() ).done ) && ( a.push( r.value ), !t || a.length !== t ); i = !0 ) ;
				} catch ( e ) {
					c = !0, o = e;
				} finally {
					try {
						i || null == n.return || n.return();
					} finally {
						if ( c ) {
							throw o;
						}
					}
				}
				return a;
			}
		}( e, t ) || function ( e, t ) {
			if ( e ) {
				if ( 'string' == typeof e ) {
					return Xo( e, t );
				}
				var n = Object.prototype.toString.call( e ).slice( 8, - 1 );
				return 'Map' === ( n = 'Object' === n && e.constructor ? e.constructor.name : n ) || 'Set' === n ? Array.from( e ) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ? Xo( e, t ) : void 0;
			}
		}( e, t ) || function () {
			throw new TypeError( 'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function Xo( e, t ) {
		( null == t || t > e.length ) && ( t = e.length );
		for ( var n = 0, r = new Array( t ); n < t; n ++ ) r[ n ] = e[ n ];
		return r;
	}

	function Zo() {
		var e = Ko( h.useState( ( null === ( t = window.navigator ) || void 0 === t ? void 0 : t.onLine ) || !1 ), 2 ),
			t = e[ 0 ],
			n = e[ 1 ];
		return h.useEffect( function () {
			function e() {
				return n( !0 );
			}

			function t() {
				return n( !1 );
			}

			return window.addEventListener( 'online', e ), window.addEventListener( 'offline', t ),
				function () {
					window.removeEventListener( 'online', e ), window.removeEventListener( 'offline', t );
				};
		}, [] ), e = v( 'sb-offline-ticker', {
			'is-offline': !t
		} ), h.createElement( 'div', {
			className: e,
			'aria-hidden': t
		}, 'You\'re offline! Progress may not be saved.' );
	}

	function Qo( e ) {
		return e = e.icon, h.createElement( 'i', {
			className: 'pz-icon pz-icon-'.concat( e )
		} );
	}

	var Jo = function ( e ) {
		var t = e.close,
			n = e.title,
			r = e.icon,
			e = e.message;
		return h.createElement( 'div', {
			className: 'toast slide-up-down',
			'aria-live': 'polite'
		}, h.createElement( 'div', {
			className: 'toast__close'
		}, h.createElement( 'button', {
			className: 'icon__button',
			type: 'button',
			onClick: t
		}, h.createElement( 'span', {
			className: 'visually-hidden'
		}, 'Close' ), h.createElement( Qo, {
			icon: 'close'
		} ) ) ), h.createElement( 'div', {
			className: 'toast__information',
			role: 'img',
			'aria-label': 'Information'
		}, r ), h.createElement( 'div', {
			className: 'toast__body'
		}, h.createElement( 'h3', null, n ), h.createElement( 'p', null, e ) ) );
	};

	function ea() {
		return ( ea = Object.assign || function ( e ) {
			for ( var t = 1; t < arguments.length; t ++ ) {
				var n,
					r = arguments[ t ];
				for ( n in r ) Object.prototype.hasOwnProperty.call( r, n ) && ( e[ n ] = r[ n ] );
			}
			return e;
		} ).apply( this, arguments );
	}

	function ta( e, t ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return e;
			}
		}( e ) || function ( e, t ) {
			var n = null == e ? null : 'undefined' != typeof Symbol && e[ Symbol.iterator ] || e[ '@@iterator' ];
			if ( null != n ) {
				var r,
					o,
					a = [],
					i = !0,
					c = !1;
				try {
					for ( n = n.call( e ); !( i = ( r = n.next() ).done ) && ( a.push( r.value ), !t || a.length !== t ); i = !0 ) ;
				} catch ( e ) {
					c = !0, o = e;
				} finally {
					try {
						i || null == n.return || n.return();
					} finally {
						if ( c ) {
							throw o;
						}
					}
				}
				return a;
			}
		}( e, t ) || function ( e, t ) {
			if ( e ) {
				if ( 'string' == typeof e ) {
					return na( e, t );
				}
				var n = Object.prototype.toString.call( e ).slice( 8, - 1 );
				return 'Map' === ( n = 'Object' === n && e.constructor ? e.constructor.name : n ) || 'Set' === n ? Array.from( e ) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ? na( e, t ) : void 0;
			}
		}( e, t ) || function () {
			throw new TypeError( 'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function na( e, t ) {
		( null == t || t > e.length ) && ( t = e.length );
		for ( var n = 0, r = new Array( t ); n < t; n ++ ) r[ n ] = e[ n ];
		return r;
	}

	function ra() {
		var e = {
				icon: null,
				title: null,
				message: null
			},
			t = null,
			n = Sn(),
			r = n.getVariant( aa ),
			o = ta( m.useState( !0 ), 2 ),
			a = o[ 0 ],
			i = o[ 1 ],
			c = Ge( function ( e ) {
				return e.isGameVisible;
			} ),
			l = Ge( function ( e ) {
				return e.userType.regiId;
			} ),
			u = Ge( function ( e ) {
				return xt( e );
			} );
		switch ( r ) {
			case '0_control':
				e.icon = null, e.title = null, e.message = null, t = null;
				break;
			case '1_look_out_b':
				e.icon = '🔍', e.title = 'Look out for the pangram', e.message = 'Every puzzle has at least one word that uses all 7 letters, called the Pangram. On some days, there might be more than one.', t = 'look out beginning';
				break;
			case '2_tips_b':
				e.icon = 'ℹ️', e.title = 'Tips for leveling up ', e.message = 'Every puzzle has at least one word that uses all 7 letters, called the Pangram. On some days, there might be more than one.', t = 'tips beginning';
				break;
			case '3_tips_g':
				3 <= u && ( e.icon = 'ℹ️', e.title = 'Tips for leveling up ', e.message = 'Every puzzle has at least one word that uses all 7 letters, called the Pangram. On some days, there might be more than one.', t = 'tips good' );
				break;
			default:
				e.icon = null, e.title = null, e.message = null, t = null;
		}
		return m.useEffect( function () {
			r && n.reportExposure( aa );
		}, [r] ), m.useEffect( function () {
			var e = ca();
			e && ( null == e ? void 0 : e.variant ) === r && ( null == e ? void 0 : e.regiId ) === l && i( !1 );
		}, [r, l] ), m.useEffect( function () {
			a ? a && c && null !== e.message && ( te( t ), ia( r, l ) ) : ia( r, l );
		}, [a, c, e.message] ), a && null !== e.message ? h.createElement( Jo, ea( {}, e, {
			close: function () {
				ee( t ), i( !1 );
			}
		} ) ) : null;
	}

	var oa = 'sb-pangram-messaging',
		aa = 'GAMES_SB_pangram',
		ia = function ( e, t ) {
			try {
				var n = JSON.stringify( {
					regiId: t,
					variant: e,
					showMessage: !1
				} );
				window.localStorage.setItem( oa, n );
			} catch ( e ) {
				return console.error( 'Spelling Bee: Failed to save pangram message status. Error: ', e ), null;
			}
		},
		ca = function () {
			try {
				var e = window.localStorage.getItem( oa ),
					t = e && JSON.parse( e );
				return t ? {
					regiId: t.regiId,
					variant: t.variant,
					showMessage: t.showMessage
				} : null;
			} catch ( e ) {
				return console.error( 'Spelling Bee: Failed to get pangram message status. Error: ', e ), null;
			}
		};

	function la( e, t ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return e;
			}
		}( e ) || function ( e, t ) {
			var n = null == e ? null : 'undefined' != typeof Symbol && e[ Symbol.iterator ] || e[ '@@iterator' ];
			if ( null != n ) {
				var r,
					o,
					a = [],
					i = !0,
					c = !1;
				try {
					for ( n = n.call( e ); !( i = ( r = n.next() ).done ) && ( a.push( r.value ), !t || a.length !== t ); i = !0 ) ;
				} catch ( e ) {
					c = !0, o = e;
				} finally {
					try {
						i || null == n.return || n.return();
					} finally {
						if ( c ) {
							throw o;
						}
					}
				}
				return a;
			}
		}( e, t ) || function ( e, t ) {
			if ( e ) {
				if ( 'string' == typeof e ) {
					return ua( e, t );
				}
				var n = Object.prototype.toString.call( e ).slice( 8, - 1 );
				return 'Map' === ( n = 'Object' === n && e.constructor ? e.constructor.name : n ) || 'Set' === n ? Array.from( e ) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ? ua( e, t ) : void 0;
			}
		}( e, t ) || function () {
			throw new TypeError( 'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function ua( e, t ) {
		( null == t || t > e.length ) && ( t = e.length );
		for ( var n = 0, r = new Array( t ); n < t; n ++ ) r[ n ] = e[ n ];
		return r;
	}

	function sa() {
		var e = .01 * window.innerHeight;
		document.documentElement.style.setProperty( '--vh', ''.concat( e, 'px' ) );
	}

	var fa = oe( sa, 100 ),
		ma = d.connect( function ( e ) {
			var t = e.isExpandedWordlist,
				n = e.isLocked,
				r = e.userType,
				o = e.printDate;
			return {
				isExpandedWordlist: t,
				isLocked: n,
				hasCompleted: Dt( e ),
				score: Ot( e ),
				userType: r,
				printDate: o
			};
		}, function ( t ) {
			return {
				lockGame: function () {
					return t( $() );
				},
				unlockGame: function () {
					return t( U() );
				},
				toggleWordlist: function () {
					return t( o() );
				},
				updateUserType: function ( e ) {
					return t( {
						type: L,
						payload: e
					} );
				},
				getRemoteProgress: function ( e ) {
					return t( ( r = e, function ( t, e ) {
						var n = e(),
							e = n.id,
							n = n.yesterday;
						w( e, r ).then( function ( e ) {
							e && t( F( e ) );
						} ), w( n.id, r ).then( function ( e ) {
							e && t( V( e ) );
						} );
					} ) );
					var r;
				},
				updateMoment: function ( e ) {
					return t( {
						type: B,
						payload: e
					} );
				}
			};
		} )( function ( e ) {
			var t = e.isExpandedWordlist,
				n = e.userType,
				r = e.isLocked,
				o = e.lockGame,
				a = e.unlockGame,
				i = e.updateUserType,
				c = e.getRemoteProgress,
				l = e.toggleWordlist,
				u = e.updateMoment,
				s = e.printDate,
				f = h.useRef(),
				m = la( h.useState( !1 ), 2 ),
				e = m[ 0 ],
				d = m[ 1 ],
				p = h.useRef( t );
			h.useEffect( function () {
				p.current && !t && d( !0 ), p.current = t;
			}, [t] );

			function y() {
				a(), g.mobileNavTools.activate();
			}

			function b( e ) {
				e = e.detail.values.gamesAuthenticateUser, mt( e, i );
			}

			return h.useEffect( function () {
				return window.isHybridWebView && window.NativeBridge ? ( window.NativeBridge.gamesGetUserDetails().then( function ( e ) {
					if ( !e.success ) {
						throw new Error( e.error );
					}
					e = e.values.gamesGetUserDetails;
					mt( e, i );
				} ).catch( function ( e ) {
					console.error( 'Getting user details failed', e );
				} ), window.NativeBridge.gamesInitializeState().then( function ( e ) {
					if ( !e.success ) {
						throw new Error( e.error );
					}
					e.values.gamesInitializeState.isReturningFromBackground ? ( er.load( 'game' ), y() ) : er.load( 'loading' );
				} ).catch( function ( e ) {
					console.error( 'Failed to get initial state', e ), er.load( 'loading' );
				} ) ) : ( er.load( 'loading' ), g.user.get().then( function ( e ) {
					e = e.id;
					e && i( {
						regiId: e
					} );
				} ).catch( function ( e ) {
					console.error( 'Failed to fetch regiId', e );
				} ) ), sa(), window.addEventListener( 'resize', fa ), window.addEventListener( 'gamesUserCredentialChanged', b ),
					function () {
						window.removeEventListener( 'resize', fa ), window.removeEventListener( 'gamesUserCredentialChanged', b );
					};
			}, [] ), h.useEffect( function () {
				if ( window.isHybridWebView && window.NativeBridge ) {
					var e = function ( e ) {
						'congrats' === er.getCurrentMoment() ? ( er.transition( 'congrats', 'game' ).then( y ), e.respondWith( {
							gamesOnNavigateBack: !0
						} ) ) : ( 0, Po.getCurrentModal )() ? ( Co(), e.respondWith( {
							gamesOnNavigateBack: !0
						} ) ) : t ? ( l(), e.respondWith( {
							gamesOnNavigateBack: !0
						} ) ) : e.respondWith( {
							gamesOnNavigateBack: !1
						} );
					};
					return window.NativeBridge.addEventListener( 'gamesOnNavigateBack', e ),
						function () {
							window.NativeBridge.removeEventListener( 'gamesOnNavigateBack', e );
						};
				}
			}, [t] ), h.useEffect( function () {
				var e = n.nytsCookie;
				e && c( e );
			}, [n.nytsCookie] ), h.createElement( h.Fragment, null, window.isHybridWebView && h.createElement( Zo, null ), h.createElement( 'div', {
				className: v( 'sb-content-box', {
					'sb-expanded': t,
					'sb-contracting': e,
					'sb-game-locked': r
				} )
			}, h.createElement( Uo, {
				printDate: s
			} ), h.createElement( Jn, {
				onEnter: u
			} ), h.createElement( Io, {
				onOpen: function ( e ) {
					o(), J( ''.concat( Q[ e = e ] || e ) );
				},
				onClose: y,
				initialModal: null
			} ), h.createElement( 'div', {
				className: 'sb-status-box'
			}, h.createElement( 'div', {
				className: 'sb-progress-box'
			}, h.createElement( zo, null ) ), h.createElement( 'div', {
				className: 'sb-wordlist-box'
			}, h.createElement( 'div', {
				className: 'sb-wordlist-heading'
			}, h.createElement( oo, null ) ), h.createElement( 'div', {
				className: 'sb-wordlist-drawer',
				onTransitionEnd: function () {
					return d( !1 );
				}
			}, h.createElement( 'div', {
				className: 'sb-wordlist-window'
			}, h.createElement( ro, null ) ) ) ) ), h.createElement( 'div', {
				className: 'sb-controls-box',
				ref: f
			}, h.createElement( 'div', {
				className: 'sb-controls'
			}, h.createElement( Mo, null ), h.createElement( Xr, null ), h.createElement( Fr, {
				boundingParentRef: f
			} ) ) ) ), h.createElement( ra, null ) );
		} );

	function da( t, e ) {
		var n,
			r = Object.keys( t );
		return Object.getOwnPropertySymbols && ( n = Object.getOwnPropertySymbols( t ), e && ( n = n.filter( function ( e ) {
			return Object.getOwnPropertyDescriptor( t, e ).enumerable;
		} ) ), r.push.apply( r, n ) ), r;
	}

	function pa( r ) {
		for ( var e = 1; e < arguments.length; e ++ ) {
			var o = null != arguments[ e ] ? arguments[ e ] : {};
			e % 2 ? da( Object( o ), !0 ).forEach( function ( e ) {
				var t,
					n;
				t = r, e = o[ n = e ], n in t ? Object.defineProperty( t, n, {
					value: e,
					enumerable: !0,
					configurable: !0,
					writable: !0
				} ) : t[ n ] = e;
			} ) : Object.getOwnPropertyDescriptors ? Object.defineProperties( r, Object.getOwnPropertyDescriptors( o ) ) : da( Object( o ) ).forEach( function ( e ) {
				Object.defineProperty( r, e, Object.getOwnPropertyDescriptor( o, e ) );
			} );
		}
		return r;
	}

	function ya( e, t ) {
		return function ( e ) {
			if ( Array.isArray( e ) ) {
				return e;
			}
		}( e ) || function ( e, t ) {
			var n = null == e ? null : 'undefined' != typeof Symbol && e[ Symbol.iterator ] || e[ '@@iterator' ];
			if ( null != n ) {
				var r,
					o,
					a = [],
					i = !0,
					c = !1;
				try {
					for ( n = n.call( e ); !( i = ( r = n.next() ).done ) && ( a.push( r.value ), !t || a.length !== t ); i = !0 ) ;
				} catch ( e ) {
					c = !0, o = e;
				} finally {
					try {
						i || null == n.return || n.return();
					} finally {
						if ( c ) {
							throw o;
						}
					}
				}
				return a;
			}
		}( e, t ) || function ( e, t ) {
			if ( e ) {
				if ( 'string' == typeof e ) {
					return ba( e, t );
				}
				var n = Object.prototype.toString.call( e ).slice( 8, - 1 );
				return 'Map' === ( n = 'Object' === n && e.constructor ? e.constructor.name : n ) || 'Set' === n ? Array.from( e ) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test( n ) ? ba( e, t ) : void 0;
			}
		}( e, t ) || function () {
			throw new TypeError( 'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.' );
		}();
	}

	function ba( e, t ) {
		( null == t || t > e.length ) && ( t = e.length );
		for ( var n = 0, r = new Array( t ); n < t; n ++ ) r[ n ] = e[ n ];
		return r;
	}

	function ga( e ) {
		var t = e.children,
			r = e.regiId,
			n = ( e = ya( m.useState( {} ), 2 ) )[ 0 ],
			o = e[ 1 ];
		return m.useEffect( function () {
			var e,
				t,
				n = ( null === ( e = window.config ) || void 0 === e ? void 0 : e.AbraConfig ) || {};
			g.abra.init( window.abra.config, {
				agent_id: ( null === ( e = window.config ) || void 0 === e || null === ( t = e.userInfo ) || void 0 === t ? void 0 : t.agentID ) || g.agentIdCookie,
				regi_id: r
			}, n ), o( pa( {}, g.abra.getTests() ) );
		}, [r] ), e = m.useMemo( function () {
			return {
				tests: n,
				getVariant: function ( e ) {
					return n[ e ];
				},
				reportExposure: function ( e ) {
					return g.abra.reportExposure( e );
				}
			};
		}, [n] ), h.createElement( On.Provider, {
			value: e
		}, t );
	}

	e = function ( e ) {
		var t = e.children,
			e = Ge( function ( e ) {
				return e.userType.regiId;
			} );
		return h.createElement( ga, {
			regiId: e
		}, t );
	}, no = document.getElementById( 'pz-game-root' );
	a.render( h.createElement( d.Provider, {
		store: function ( e ) {
			var t = [r.applyMiddleware( n, Zn, Qn, Xn )];
			window.__REDUX_DEVTOOLS_EXTENSION__ && t.push( window.__REDUX_DEVTOOLS_EXTENSION__() );
			var o = r.createStore( lr, sr( sr( {}, ( e = e ).today ), {}, {
				input: [],
				foundWords: [],
				isExpandedWordlist: !1,
				isLocked: !0,
				message: null,
				yesterday: sr( sr( {}, e.yesterday ), {}, {
					foundWords: null
				} ),
				userType: sr( sr( {}, g.userType ), {}, {
					nytsCookie: null
				} ),
				currentMoment: "",
				hasLoaded: !1,
				isGameVisible: !1,
				stats: [{}]
			} ), r.compose.apply( void 0, t ) );
			return i( o, function ( e ) {
				return o.dispatch( F( e ) )
			}, function ( e ) {
				return o.dispatch( V( e ) )
			}, function () {
				return o.dispatch( {
					type: R
				} )
			} ), o.dispatch( H() ), window.userType.inShortzMode && ( window.cheat = function () {
				var e = 0 < arguments.length && void 0 !== arguments[ 0 ] ? arguments[ 0 ] : 1,
					t = o.getState(),
					n = t.answers,
					r = t.foundWords;
				n.filter( function ( e ) {
					return !r.includes( e )
				} ).slice( 0, e ).forEach( function ( e ) {
					return o.dispatch( {
						type: T,
						payload: e
					} )
				} )
			}, window.reset = function () {
				o.dispatch( {
					type: z
				} )
			} ), o
		}( g.getGameData() )
	}, h.createElement( e, null, h.createElement( ma, null ) ) ), no )
} );
//# sourceMappingURL=spelling-bee.03aa60cc50098a0c7debf56771bbf6aca5678ec2.js.map
