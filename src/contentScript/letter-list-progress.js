export function LetterListProgress( { progress } ) {
	return (
		<table id="methodical__letter-list-progress">
			<tbody>
				{ Object.keys( progress ).map( ( key, index ) => {
					const { found, total } = progress[key];
					const checked = found === total ? 'checked' : '';

					return (
						<tr key={ index }>
							<td>
								<input type="checkbox" id="1" checked={ checked } disabled />
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
	);
}
