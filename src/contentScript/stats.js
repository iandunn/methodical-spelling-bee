export function Stats( { stats } ) {
	return (
		<div id="methodical__stats">
			<h3>Stats</h3>

			<ul>
				{ Object.keys( stats ).map( ( key, index ) => {
					const { found, total } = stats[ key ];

					const finished = found === total;
					const classes = finished ? 'methodical__finished' : '';

					return (
						<li key={ index } className={ classes }>
							<input type="checkbox" checked={ finished } disabled />

							<span className="methodical__stats-key-name">
								{ key }
							</span>

							{ found }/{ total }
						</li>
					);
				} ) }
			</ul>
		</div>
	);
}
