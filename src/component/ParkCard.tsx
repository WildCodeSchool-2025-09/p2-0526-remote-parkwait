import { useEffect, useState } from "react";
import type { Park } from "../types";

function ParkCard({ park }: { park: Park }) {
	const [isOpen, setIsOpen] = useState<boolean | null>(null);

	useEffect(() => {
		fetch(`/api/parks/${park.id}/queue_times.json`)
			.then((response) => response.json())
			.then((data) => {
				const allRides = [
					...data.rides,
					...data.lands.flatMap(
						(land: { rides: { is_open: boolean }[] }) => land.rides,
					),
				];
				setIsOpen(allRides.some((ride) => ride.is_open));
			});
	}, [park.id]);

	return (
		<article className="ParkCard">
			<p className="ParkCard-name">{park.name}</p>
			<p className="ParkCard-status">
				{isOpen === null ? "..." : isOpen ? "Ouvert" : "Fermé"}
			</p>
			<p className="ParkCard-country">{park.country}</p>
		</article>
	);
}

export default ParkCard;
