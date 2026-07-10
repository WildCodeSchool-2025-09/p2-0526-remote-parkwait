import clockIcon from "../asset/img/icons/clock.svg";
import usergroupIcon from "../asset/img/icons/usergroup.svg";
import "../css/ParkKPIs.css";
import type { AffluenceLevel, ParkSummary } from "../types";

const attractionIcon = "/icons/lands/attraction.svg";

interface ParkKPIsProps {
	summary: ParkSummary;
}

type KpiTone = "good" | "medium" | "bad";

function getWaitTone(waitTime: number): KpiTone {
	if (waitTime <= 20) return "good";
	if (waitTime <= 50) return "medium";
	return "bad";
}

const AFFLUENCE_TONE: Record<AffluenceLevel, KpiTone> = {
	Faible: "good",
	Moderée: "medium",
	Elevée: "bad",
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
	const waitTone = getWaitTone(averageWaitTime);
	const affluenceTone = AFFLUENCE_TONE[summary.affluence];

	return (
		<section className="park-kpis">
			<article className="kpi-card">
				<div className="kpi-header">
					<KpiIcon icon={clockIcon} />
					<p className="kpi-label">Attente moyenne</p>
				</div>
				<p className={`kpi-value kpi-value-${waitTone}`}>
					{averageWaitTime} min
				</p>
			</article>

			<article className="kpi-card">
				<div className="kpi-header">
					<KpiIcon icon={attractionIcon} />
					<p className="kpi-label">Attractions ouvertes</p>
				</div>
				<p className="kpi-value kpi-value-good">
					{summary.openRidesCount} / {summary.totalRidesCount}
				</p>
			</article>

			<article className="kpi-card">
				<div className="kpi-header">
					<KpiIcon icon={usergroupIcon} />
					<p className="kpi-label">Affluence</p>
				</div>
				<p className={`kpi-value kpi-value-${affluenceTone}`}>
					{summary.affluence}
				</p>
			</article>
		</section>
	);
}

export default ParkKPIs;
