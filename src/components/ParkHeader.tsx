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
				<span
					className={`badge ${summary.isOpen ? "badge-open" : "badge-closed"}`}
				>
					<img
						src={
							summary.isOpen ? "/icons/checkcircle.svg" : "/icons/cancel.svg"
						}
						alt=""
						width="16"
					/>
					{summary.isOpen ? `Ouvert jusqu'à ${summary.closingTime}` : "Fermé"}
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
