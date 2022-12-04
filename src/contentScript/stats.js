export function Stats( { stats } ) {
	return (
		<div id="methodical__stats">
			<h3>Stats</h3>

			<table>
				<tbody>
					{ Object.keys( stats ).map( ( key, index ) => {
						const { found, total } = stats[key];

						const finished = found === total;
						const classes  = finished ? 'methodical__finished' : '';

						return (
							<tr key={ index } className={ classes }>
								<td>
									<input type="checkbox" checked={ finished } disabled />
								</td>

								<td className="methodical__stats-key-name">
									{ key }
								</td>

								<td>
									{ found }/{ total }
								</td>
							</tr>
						);
					} )	}
				</tbody>
			</table>
		</div>
	);
}
