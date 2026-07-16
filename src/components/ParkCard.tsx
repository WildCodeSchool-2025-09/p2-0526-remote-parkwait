import { Link } from "react-router-dom";
import "../css/ShowParksCard.css";
import { useParkSummary } from "../hooks/useParkSummary";
import type { Park } from "../types";
import ParkFavoriteButton from "./ParkFavoriteButton";
import ParkKPIs from "./ParkKPIs";
import { useState } from "react";

function ParkCard({
	park,
	favoriteParks,
	addFavoritePark,
}: {
	park: Park;
	favoriteParks?: Park[];
	addFavoritePark?: (park: Park) => void;
}) {
	const summary = useParkSummary(String(park.id));

	const [imgSrc, setImgSrc] = useState(`/icons/parks/${park.id}.webp`);
	const [triedFallback, setTriedFallback] = useState(false);

	const status =
		summary === null
			? { text: "...", className: "" }
			: summary.isOpen
				? { text: "Open", className: "is-open" }
				: { text: "Closed", className: "is-closed" };

	function handleImageError() {
		if (!triedFallback) {
			setImgSrc("/icons/parks/default.webp");
			setTriedFallback(true);
		}
	}

	return (
		<article className="ParkCard">
			<Link to={`/park/${park.id}`} className="ParkCard-link">
				<div className="ParkCard-header">
					<img
						src={imgSrc}
						alt=""
						className="ParkCard-image"
						onError={handleImageError}
					/>
					<div className="ParkCard-text">
						<h2 className="ParkCard-name">{park.name}</h2>
						<p className={`ParkCard-status ${status.className}`}>
							{status.text}
						</p>
						<p className="ParkCard-country">{park.country}</p>
					</div>
				</div>

				{summary && (
					<div className="ParkCard-kpis">
						<ParkKPIs summary={summary} />
					</div>
				)}
			</Link>

			{addFavoritePark && favoriteParks && (
				<div className="ParkCard-favorite">
					<ParkFavoriteButton
						park={park}
						addFavoritePark={addFavoritePark}
						favoriteParks={favoriteParks}
					/>
				</div>
			)}
		</article>
	);
}

export default ParkCard;
