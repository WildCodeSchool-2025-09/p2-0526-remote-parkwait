import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/ShowParksCard.css";
import type { Land, Park, ParkQueueData } from "../types";
import ParkFavoriteButton from "./ParkFavoriteButton";

function ParkCard({
	park,
	favoriteParks,
	addFavoritePark,
}: {
	park: Park;
	favoriteParks?: Park[];
	addFavoritePark?: (park: Park) => void;
}) {
	const [isOpen, setIsOpen] = useState<boolean | null>(null);
	const [imgSrc, setImgSrc] = useState(`/icons/parks/${park.id}.webp`);
	const [triedFallback, setTriedFallback] = useState(false);

	useEffect(() => {
		fetch(`/api/parks/${park.id}/queue_times.json`)
			.then((response) => response.json())
			.then((data: ParkQueueData) => {
				const allRides = [
					...data.rides,
					...data.lands.flatMap((land: Land) => land.rides),
				];
				setIsOpen(allRides.some((ride) => ride.is_open));
			});
	}, [park.id]);

	const status =
		isOpen === null
			? { text: "...", className: "" }
			: isOpen
				? { text: "Ouvert", className: "is-open" }
				: { text: "Fermé", className: "is-closed" };

	function handleImageError() {
		if (!triedFallback) {
			setImgSrc("/icons/parks/default.webp");
			setTriedFallback(true);
		}
	}

	return (
		<article className="ParkCard">
			<Link to={`/park/${park.id}`} className="ParkCard-link">
				<img
					src={imgSrc}
					alt={park.name}
					className="ParkCard-image"
					onError={handleImageError}
				/>
				<div className="ParkCard-text">
					<p className="ParkCard-name">{park.name}</p>
					<p className={`ParkCard-status ${status.className}`}>{status.text}</p>
					<p className="ParkCard-country">{park.country}</p>
				</div>
			</Link>
			{addFavoritePark && favoriteParks && (
				<ParkFavoriteButton
					park={park}
					addFavoritePark={addFavoritePark}
					favoriteParks={favoriteParks}
				/>
			)}
		</article>
	);
}

export default ParkCard;