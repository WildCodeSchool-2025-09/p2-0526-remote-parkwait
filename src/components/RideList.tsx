import { useParkRides } from "../hooks/useParkRides";
import type { Ride } from "../types";
import { byWaitTime } from "../utils/rideUtils";
import RideItem from "./RideItem";
import "../css/RideList.css";

function RideList({
	parkId,
	addFavorite,
	favoriteRides,
}: {
	parkId: number;
	addFavorite: (ride: Ride) => void;
	favoriteRides: Ride[];
}) {
	const { rides, isLoading, error } = useParkRides(parkId);

	const openRides = rides.filter((ride) => ride.is_open).sort(byWaitTime);
	const closedRides = rides.filter((ride) => !ride.is_open);

	if (isLoading) return <p aria-live="polite">Chargement des attractions...</p>;
	if (error) return <div className="error">{error}</div>;

	return (
		<div className="ride-list-container" aria-live="polite">
			<div className="ride-stats">
				<h2>{rides.length} ATTRACTIONS</h2>
				<h3>Attractions ouvertes : {openRides.length}</h3>
			</div>

			<ul className="ride-list" aria-live="polite">
				{openRides.map((ride, index) => (
					<RideItem
						key={ride.id}
						ride={ride}
						index={index}
						favorites={favoriteRides}
						onToggle={addFavorite}
					/>
				))}
			</ul>

			{/* Liste des fermées */}
			{closedRides.length > 0 && (
				<section className="closed-rides-section">
					<h2>FERMÉES ({closedRides.length})</h2>
					<ul className="ride-list closed-list">
						{closedRides.map((ride) => (
							<RideItem
								key={ride.id}
								ride={ride}
								variant="closed"
								favorites={favoriteRides}
								onToggle={addFavorite}
							/>
						))}
					</ul>
				</section>
			)}
		</div>
	);
}

export default RideList;
