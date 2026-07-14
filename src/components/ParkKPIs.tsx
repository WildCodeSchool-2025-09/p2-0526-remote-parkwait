import type { ParkSummary } from "../types";

interface ParkKPIsProps {
	summary: ParkSummary;
}

function ParkKPIs({ summary }: ParkKPIsProps) {
	return (
		<section className="kpi-container" aria-label="Indicateurs du parc">
			<article className="kpi-card">
				{/* classname à prévoir des différentes cards pour article et section, label */}
				<p>Attente moyenne</p>
				<strong>{Math.round(summary.averageWaitTime)} min</strong>
			</article>
			<article className="kpi-card">
				<p>Attractions ouvertes</p>
				<strong>
					{summary.openRidesCount} / {summary.totalRidesCount}
				</strong>
			</article>
			<article className="kpi-card">
				<p>Affluence</p>
				<strong>{summary.affluence}</strong>
			</article>
		</section>
	);
}

export default ParkKPIs;
