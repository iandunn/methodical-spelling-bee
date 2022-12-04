export function LetterListProgress( { progress } ) {
	return (
		<div id="methodical__letter-list-progress">
			<h3>Two Letter List</h3>

			<table>
				<tbody>
					{ Object.keys( progress ).map( ( key, index ) => {
						const { found, total } = progress[key];
						const finished = found === total;
						const classes  = finished ? 'methodical__finished' : '';

						return (
							<tr key={ index } className={ classes }>
								<td>
									<input type="checkbox" checked={ finished } disabled />
								</td>

								<td className="methodical__pair-key">
									{ key }
								</td>

								<td>
									({ found }/{ total })
								</td>
							</tr>
						);
					} )	}
				</tbody>
			</table>
		</div>
	);
}
