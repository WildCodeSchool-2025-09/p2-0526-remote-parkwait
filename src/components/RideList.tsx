import { useParkRides } from "../hooks/useParkRides";
import type { Ride } from "../types";
import { getWaitTimeClass } from "../utils/rideUtils";
import FavoriteButton from "./FavoriteButton";
import HiddenButton from "./HiddenButton";
import "../css/RideList.css";
import Done from "./Done";

function RideList({
	parkId,
	addFavorite,
	favoriteRides,
	doneRideIds,
	toggleDone
}: {
	parkId: number;
	addFavorite: (ride: Ride) => void;
	favoriteRides: Ride[];
	doneRideIds: number[];
	toggleDone: (id: number) => void;
}) {
	const { rides, isLoading, error } = useParkRides(parkId);

	const openRides = rides
		.filter((ride) => ride.is_open && !doneRideIds.some((rideId) => rideId === ride.id))
		.sort((a, b) => a.wait_time - b.wait_time);	

	const closedRides = rides.filter((ride) => !ride.is_open && !doneRideIds.some((rideId) => rideId === ride.id));

	const doneRides = rides.filter((ride) => doneRideIds.some((rideId) => rideId === ride.id));

	if (isLoading) return <p aria-live="polite">Chargement des attractions...</p>;
	if (error) return <div className="error">{error}</div>;

	return (
		<div className="ride-list-container" aria-live="polite">
			<div className="ride-stats">
				<h1>{rides.length} RIDES</h1>
				<h2>Rides open : {openRides.length}</h2>
			</div>

			<ul className="ride-list" aria-live="polite">
				{openRides.map((ride, index) => (
					<li key={ride.id} className="ride-item">
						<div className="ride-info">
							<span className="ride-number">{index + 1}</span>
							<div className="ride-text">
								<h3>{ride.name}</h3>
								<span className="ride-category">{ride.category}</span>
							</div>
						</div>

						<div className="ride-actions">
							<div
								className={`ride-wait-time ${getWaitTimeClass(ride.wait_time)}`}
							>
								{ride.wait_time} min
							</div>

							<Done 
								ride={ride}
								doneRideIds={doneRideIds}
								toggleDone={toggleDone}
							/>

							<FavoriteButton
								ride={ride}
								addFavorite={addFavorite}
								favoriteRides={favoriteRides}
							/>
							<HiddenButton rideName={ride.name} />
						</div>
					</li>
				))}
			</ul>

			{closedRides.length > 0 && (
				<section className="closed-rides-section">
					<h2>CLOSED ({closedRides.length})</h2>
					<ul className="ride-list closed-list">
						{closedRides.map((ride) => (
							<li key={ride.id} className="ride-item closed">
								<div className="ride-info">
									<div className="ride-text">
										<h3>{ride.name}</h3>
										<span className="ride-category">{ride.category}</span>
									</div>
								</div>
								<div className="ride-actions">
									<div className="ride-status">Closed</div>
								</div>
							</li>
						))}
					</ul>
				</section>
			)}
			{doneRides.length > 0 && (
				<section className="done-rides-section">
					<h2>DONE ({doneRides.length})</h2>
					<ul className="ride-list done-list">
						{doneRides.map((ride) => (
							<li key={ride.id} className="ride-item done">
								<div className="ride-info">
									<div className="ride-text">
										<h3>{ride.name}</h3>
										<span className="ride-category">{ride.category}</span>
									</div>
								</div>
								<div className="ride-actions">
									<Done
										ride={ride}
										doneRideIds={doneRideIds}
										toggleDone={toggleDone}
									/>
								</div>
							</li>
						))}
					</ul>
				</section>
			)}
		</div>
	);
}

export default RideList;
