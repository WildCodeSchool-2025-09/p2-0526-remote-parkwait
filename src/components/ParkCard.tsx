import { useEffect, useState } from "react";
import type { Land, Park, ParkQueueData } from "../types";
import { Link } from "react-router-dom";

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

	return (
		<article className="ParkCard">
			<Link to={`/park/${park.id}`} className="ParkCard">
				<p className="ParkCard-name">{park.name}</p>
				<p className="ParkCard-status">
					{isOpen === null ? "..." : isOpen ? "Ouvert" : "Fermé"}
				</p>
				<p className="ParkCard-country">{park.country}</p>
			</Link>
		</article>
	);
}

export default ParkCard;
