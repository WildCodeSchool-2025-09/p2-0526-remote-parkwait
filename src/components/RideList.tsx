import { useState } from "react";
import { useParkRides } from "../hooks/useParkRides";
import type { FilterType, Ride } from "../types";
import { groupRidesByLand } from "../utils/rideUtils";
import Done from "./Done";
import LandSection from "./LandSection";
import RideItem from "./RideItem";
import SearchBarRide from "./SearchBarRide";
import "../css/RideList.css";

function RideList({
	parkId,
	addFavorite,
	favoriteRides,
	doneRideIds,
	toggleDone,
}: {
	parkId: number;
	addFavorite: (ride: Ride) => void;
	favoriteRides: Ride[];
	doneRideIds: number[];
	toggleDone: (id: number) => void;
}) {
	const { rides, isLoading, error } = useParkRides(parkId);
	const [searchTerm, setSearchTerm] = useState("");
	const [activeFilter, setActiveFilter] = useState<FilterType>("Toutes");

	const openRides = rides
		.filter(
			(ride) =>
				ride.is_open && !doneRideIds.some((rideId) => rideId === ride.id),
		)
		.sort((a, b) => a.wait_time - b.wait_time);

	const closedRides = rides.filter(
		(ride) =>
			!ride.is_open && !doneRideIds.some((rideId) => rideId === ride.id),
	);

	const doneRides = rides.filter((ride) =>
		doneRideIds.some((rideId) => rideId === ride.id),
	);

	const filteredOpenRides = openRides.filter((ride) =>
		ride.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const groupedLands = groupRidesByLand(filteredOpenRides);

	if (isLoading) return <p aria-live="polite">Chargement des attractions...</p>;
	if (error) return <div className="error">{error}</div>;

	return (
		<div className="ride-list-container" aria-live="polite">
			<div className="ride-stats">
				<SearchBarRide
					onSearchChange={setSearchTerm}
					onFilterChange={setActiveFilter}
				/>
				<h1>{rides.length} ATTRACTIONS</h1>
				<h2>Attractions ouvertes : {openRides.length}</h2>
			</div>

			{activeFilter === "Thème" ? (
				groupedLands.map((land) => (
					<LandSection
						key={land.name}
						land={land}
						addFavorite={addFavorite}
						favoriteRides={favoriteRides}
						doneRideIds={doneRideIds}
						toggleDone={toggleDone}
					/>
				))
			) : (
				<ul className="ride-list">
					{filteredOpenRides.map((ride, index) => (
						<RideItem
							key={ride.id}
							ride={ride}
							index={index + 1}
							addFavorite={addFavorite}
							favoriteRides={favoriteRides}
							doneRideIds={doneRideIds}
							toggleDone={toggleDone}
						/>
					))}
				</ul>
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
								addFavorite={addFavorite}
								favoriteRides={favoriteRides}
								doneRideIds={doneRideIds}
								toggleDone={toggleDone}
							/>
						))}
					</ul>
				</section>
			)}

			{doneRides.length > 0 && (
				<section className="done-rides-section">
					<h2>TERMINÉES ({doneRides.length})</h2>
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
