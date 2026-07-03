import { useParams } from "react-router-dom";
import RideList from "../components/RideList";
import type { Ride } from "../types";

function Park({
	addFavorite,
	favoriteRides,
}: { addFavorite: (ride: Ride) => void; favoriteRides: Ride[] }) {
	const { id } = useParams<{ id: string }>();
	const parkId = Number(id);

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
