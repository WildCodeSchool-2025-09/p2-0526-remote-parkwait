import { useParams } from "react-router-dom";
import { useEffect } from "react";
import RideList from "../components/RideList";
import type { Ride } from "../types";

function Park({
	addFavorite,
	favoriteRides,
	setCurrentParkId,
}: {
	addFavorite: (ride: Ride) => void;
	favoriteRides: Ride[];
	setCurrentParkId: (id: number | null) => void;
}) {
	const { id } = useParams<{ id: string }>();
	const parkId = Number(id);

	// on informe App.tsx quel parc est actuellement affiché
	useEffect(() => {
		if (parkId) {
			setCurrentParkId(parkId);
		}
	}, [parkId, setCurrentParkId]);

	return (
		<div className="park-page">
			{parkId ? (
				<RideList
					parkId={parkId}
					addFavorite={addFavorite}
					favoriteRides={favoriteRides}
				/>
			) : (
				<p>Parc introuvable.</p>
			)}
		</div>
	);
}

export default Park;