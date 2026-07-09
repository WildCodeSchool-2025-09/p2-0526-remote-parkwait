import type { ParkSummary } from "../types";

interface ParkKPIsProps {
	summary: ParkSummary;
}

function ParkKPIs({ summary }: ParkKPIsProps) {
	return (
		<section>
			<article>
				{/* classname à prévoir des différentes cards pour article et section, label */}
				<p>Attente moyenne</p>
				<p>Calcul des temps d'attente avec l'average</p>
			</article>
			<article>
				<p>Attractions ouvertes</p>
				<p> openRides / totalRides</p>
			</article>
			<article>
				<p>Affluence</p>
				<p>Reuse du {summary.affluence}</p>
			</article>
		</section>
	);
}

export default ParkKPIs;
