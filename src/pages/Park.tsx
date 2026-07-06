import { useEffect } from "react";
import { useParams } from "react-router-dom";
import RideList from "../components/RideList";
import type { Ride } from "../types";

function Park({
	addFavorite,
	favoriteRides,
	setCurrentParkId,
	doneRideIds,
	toggleDone,
}: {
	addFavorite: (ride: Ride) => void;
	favoriteRides: Ride[];
	setCurrentParkId: (id: number | null) => void;
	doneRideIds: number[];
	toggleDone: (id: number) => void;
}) {
	const { id } = useParams<{ id: string }>();
	const parkId = Number(id);

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
					doneRideIds={doneRideIds}
					toggleDone={toggleDone}
				/>
			) : (
				<p>Parc introuvable.</p>
			)}
		</div>
	);
}

export default Park;
