import { useState } from "react";
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
	const [hiddenRideIds, setHiddenRideIds] = useState<number[]>([]);

	// on oublie les attractions ignorées du parc précédent en changeant de parc
	const [renderedParkId, setRenderedParkId] = useState(parkId);
	if (parkId !== renderedParkId) {
		setRenderedParkId(parkId);
		setHiddenRideIds([]);
	}

	function toggleHidden(ride: Ride) {
		setHiddenRideIds((ids) =>
			ids.includes(ride.id)
				? ids.filter((id) => id !== ride.id)
				: [...ids, ride.id],
		);
	}

	const visibleRides = rides.filter((ride) => !hiddenRideIds.includes(ride.id));
	const hiddenRides = rides.filter((ride) => hiddenRideIds.includes(ride.id));

	const openRides = visibleRides
		.filter((ride) => ride.is_open)
		.sort(byWaitTime);
	const closedRides = visibleRides.filter((ride) => !ride.is_open);

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
						onToggleHidden={toggleHidden}
					/>
				))}
			</ul>

			{hiddenRides.length > 0 && (
				<section className="hidden-rides-section">
					<h2>IGNORÉE ({hiddenRides.length})</h2>
					<ul className="ride-list hidden-list">
						{hiddenRides.map((ride) => (
							<RideItem
								key={ride.id}
								ride={ride}
								variant="hidden"
								favorites={favoriteRides}
								onToggle={addFavorite}
								onToggleHidden={toggleHidden}
							/>
						))}
					</ul>
				</section>
			)}

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
								onToggleHidden={toggleHidden}
							/>
						))}
					</ul>
				</section>
			)}
		</div>
	);
}

export default RideList;
