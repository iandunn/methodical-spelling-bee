export function Stats( { stats } ) {
	return (
		<div id="methodical__stats">
			<h3>Stats</h3>

			<table>
				<tbody>
					{ Object.keys( stats ).map( ( key, index ) => {
						const { found, total } = stats[key];

						return (
							<tr key={ index }>
								<td>
									<input type="checkbox" checked={ found === total } disabled />
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
