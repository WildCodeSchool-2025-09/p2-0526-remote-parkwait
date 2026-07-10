import cancelIcon from "../asset/img/icons/cancel.svg";
import checkCircleIcon from "../asset/img/icons/checkcircle.svg";
import graphBarIcon from "../asset/img/icons/graphbar.svg";
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
						src={summary.isOpen ? checkCircleIcon : cancelIcon}
						alt=""
						width="16"
					/>
					{summary.isOpen ? `Ouvert jusqu'à ${summary.closingTime}` : "Fermé"}
				</span>
				<span className="badge">
					<img src={graphBarIcon} alt="" width="16" />
					{summary.affluence} (Affluence)
				</span>
			</div>
		</header>
	);
}

export default ParkHeader;
