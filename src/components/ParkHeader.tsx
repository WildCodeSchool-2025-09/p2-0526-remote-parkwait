import type { ParkSummary } from "../types";

interface ParkHeaderProps {
	summary: ParkSummary;
}

function ParkHeader({ summary }: ParkHeaderProps) {
	return (
		<header className="park-header">
			<p className="label">Parc sélectionné</p>
			<h1 className="title">{summary.name}</h1>
			<div className="badges">
				<span className="badge badge-open">
					<img src="/icons/checkcircle.svg" alt="" width="16" />
					{summary.isOpen ? "Ouvert" : "Fermé"} jusqu'à {summary.closingTime}
				</span>
				<span className="badge">
					<img src="/icons/graphbar.svg" alt="" width="16" />
					{summary.affluence} (Affluence)
				</span>
			</div>
		</header>
	);
}

export default ParkHeader;
