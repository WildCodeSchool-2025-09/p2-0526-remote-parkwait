import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ParkHeader from "../components/ParkHeader";
import ParkKPIs from "../components/ParkKPIs";
import RideList from "../components/RideList";
import { useParkSummary } from "../hooks/useParkSummary";
import type { Ride } from "../types";

function Park({
	addFavorite,
	favoriteRides,
	setCurrentParkId,
	doneRideIds,
	toggleDone,
	hiddenRideIds,
	toggleHidden,
}: {
	addFavorite: (ride: Ride) => void;
	favoriteRides: Ride[];
	setCurrentParkId: (id: number | null) => void;
	doneRideIds: number[];
	toggleDone: (id: number) => void;
	hiddenRideIds: number[];
	toggleHidden: (id: number) => void;
}) {
	const { parkId: id } = useParams<{ parkId: string }>();
	const summary = useParkSummary(id);
	const parkId = Number(id);

	useEffect(() => {
		if (parkId) {
			setCurrentParkId(parkId);
		}
	}, [parkId, setCurrentParkId]);

	if (summary === null) {
		return <p>Chargement...</p>;
	}

	return (
		<>
			<ParkHeader summary={summary} />
			<ParkKPIs summary={summary} />
			<div className="park-page">
				{id ? (
					<RideList
						parkId={parkId}
						addFavorite={addFavorite}
						favoriteRides={favoriteRides}
						doneRideIds={doneRideIds}
						toggleDone={toggleDone}
						hiddenRideIds={hiddenRideIds}
						toggleHidden={toggleHidden}
					/>
				) : (
					<p>Parc introuvable.</p>
				)}
			</div>
		</>
	);
}

export default Park;
