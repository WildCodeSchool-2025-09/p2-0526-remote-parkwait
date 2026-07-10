import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import cancelIcon from "../asset/img/icons/cancel.svg";
import checkCircleIcon from "../asset/img/icons/checkcircle.svg";
import "../css/ShowParksCard.css";
import type { Park, ParkSummary } from "../types";
import { getParkSummary } from "../utils/parkSummary";

interface ParkCardProps {
	park: Park;
	children?: ReactNode;
}

function ParkCard({ park, children }: ParkCardProps) {
	const [summary, setSummary] = useState<ParkSummary | null>(null);

	useEffect(() => {
		getParkSummary(park).then(setSummary);
	}, [park]);

	const status =
		summary === null
			? { text: "...", icon: null, className: "" }
			: summary.isOpen
				? {
						text: `Ouvert jusqu'à ${summary.closingTime}`,
						icon: checkCircleIcon,
						className: "is-open",
					}
				: { text: "Fermé", icon: cancelIcon, className: "is-closed" };

	return (
		<article className="ParkCard">
			<Link to={`/park/${park.id}`} className="ParkCard-link">
				<p className="ParkCard-name">{park.name}</p>
				<p className={`ParkCard-status ${status.className}`}>
					{status.icon && <img src={status.icon} alt="" width="16" />}
					{status.text}
				</p>
				<p className="ParkCard-country">{park.country}</p>
			</Link>
			{children}
		</article>
	);
}

export default ParkCard;
