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
	const { id } = useParams<{ id: string }>();
	const parkId = Number(id);
	const summary = useParkSummary(id);

	if (summary === null) {
		return <p>Chargement...</p>;
	}

	return (
		<div className="park-page">
			<ParkHeader summary={summary} />
			<ParkKPIs summary={summary} />
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
