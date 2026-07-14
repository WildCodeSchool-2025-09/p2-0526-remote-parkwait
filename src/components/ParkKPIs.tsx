import clockIcon from "../asset/img/icons/clock.svg";
import usergroupIcon from "../asset/img/icons/usergroup.svg";
import "../css/ParkKPIs.css";
import type { AffluenceLevel, ParkSummary } from "../types";
import { getWaitTimeClass } from "../utils/rideUtils";

const attractionIcon = "/icons/lands/attraction.svg";

interface ParkKPIsProps {
	summary: ParkSummary;
}

const AFFLUENCE_CLASS: Record<AffluenceLevel, string> = {
	Faible: "wait-short",
	Moderée: "wait-medium",
	Elevée: "wait-long",
};

function KpiIcon({ icon }: { icon: string }) {
	return (
		<span className="kpi-icon">
			<span
				className="kpi-icon-glyph"
				style={{ maskImage: `url(${icon})`, WebkitMaskImage: `url(${icon})` }}
			/>
		</span>
	);
}

function ParkKPIs({ summary }: ParkKPIsProps) {
	const averageWaitTime = Math.round(summary.averageWaitTime);

	return (
		<section className="kpi-container" aria-label="Indicateurs du parc">
			<article className="kpi-card">
				<div className="kpi-header">
					<KpiIcon icon={clockIcon} />
					<p>Attente moyenne</p>
				</div>
				<strong className={`kpi-value ${getWaitTimeClass(averageWaitTime)}`}>
					{averageWaitTime} min
				</strong>
			</article>
			<article className="kpi-card">
				<div className="kpi-header">
					<KpiIcon icon={attractionIcon} />
					<p>Attractions ouvertes</p>
				</div>
				<strong className="kpi-value wait-short">
					{summary.openRidesCount} / {summary.totalRidesCount}
				</strong>
			</article>
			<article className="kpi-card">
				<div className="kpi-header">
					<KpiIcon icon={usergroupIcon} />
					<p>Affluence</p>
				</div>
				<strong className={`kpi-value ${AFFLUENCE_CLASS[summary.affluence]}`}>
					{summary.affluence}
				</strong>
			</article>
		</section>
	);
}

export default ParkKPIs;
