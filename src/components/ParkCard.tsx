import { useEffect, useState } from "react";
import "../css/ShowParksCard.css";
import type { Land, Park, ParkQueueData } from "../types";

function ParkCard({ park }: { park: Park }) {
	const [isOpen, setIsOpen] = useState<boolean | null>(null);

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

	return (
		<article className="ParkCard">
			<p className="ParkCard-name">{park.name}</p>
			<p className={`ParkCard-status ${status.className}`}>{status.text}</p>
			<p className="ParkCard-country">{park.country}</p>
		</article>
	);
}

export default ParkCard;
