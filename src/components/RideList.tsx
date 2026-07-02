import { useParkRides } from "../hooks/useParkRides";
import { getWaitTimeClass } from "../utils/rideUtils";
import FavoriteButton from "./FavoriteButton";
import HiddenButton from "./HiddenButton";
import "../css/RideList.css";

function RideList({ parkId }: { parkId: number }) {
	const { rides, isLoading, error } = useParkRides(parkId);

	const openRides = rides.filter((ride) => ride.is_open);
	const closedRides = rides.filter((ride) => !ride.is_open);

	if (isLoading) return <p aria-live="polite">Chargement des attractions...</p>;
	if (error) return <div className="error">{error}</div>;

	return (
		<div className="ride-list-container" aria-live="polite">
			<div className="ride-stats">
				<h1>{rides.length} ATTRACTIONS</h1>
				<h2>Attractions ouvertes : {openRides.length}</h2>
			</div>

			<ul className="ride-list">
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

							<FavoriteButton rideName={ride.name} />
							<HiddenButton rideName={ride.name} />
						</div>
					</li>
				))}
			</ul>

			{closedRides.length > 0 && (
				<section className="closed-rides-section">
					<h2>FERMÉES ({closedRides.length})</h2>
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
									<div className="ride-status">Fermé</div>
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
