import { useParams } from "react-router-dom";
import ParkHeader from "../components/ParkHeader";
import ParkKPIs from "../components/ParkKPIs";
import RideList from "../components/RideList";
import { useParkSummary } from "../hooks/useParkSummary";
import type { Ride } from "../types";

function Park({
	addFavorite,
	favoriteRides,
}: { addFavorite: (ride: Ride) => void; favoriteRides: Ride[] }) {
	const { parkId: id } = useParams<{ parkId: string }>();
	const summary = useParkSummary(id);
	const parkId = Number(id);

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
					/>
				) : (
					<p>Parc introuvable.</p>
				)}
			</div>
		</>
	);
}

export default Park;
