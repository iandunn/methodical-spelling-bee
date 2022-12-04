export function Grid( { grid } ) {
	return (
		<div id="methodical__grid">
			<h3>Grid</h3>

			<table dangerouslySetInnerHTML={ grid } />
		</div>
	);
}
