import { useState } from "react";
import { useParkRides } from "../hooks/useParkRides";
import type { FilterType, Ride } from "../types";
import { byWaitTime } from "../utils/rideUtils";
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
	const [activeFilter, setActiveFilter] = useState<FilterType>("all");

	// Filtrage basé sur la recherche et la catégorie
	const filteredRides = rides.filter((ride) => {
		const matchesSearch = ride.name.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesFilter = activeFilter === "all" || ride.category === activeFilter;
		return matchesSearch && matchesFilter;
	});

	// On divise la liste filtrée en trois catégories : ouvertes, fermées, terminées
	const openRides = filteredRides
		.filter((ride) => ride.is_open && !doneRideIds.includes(ride.id))
		.sort(byWaitTime);
	const closedRides = filteredRides.filter(
		(ride) => !ride.is_open && !doneRideIds.includes(ride.id),
	);
	const doneRides = filteredRides.filter((ride) => doneRideIds.includes(ride.id));

	if (isLoading) return <p aria-live="polite">Chargement des attractions...</p>;
	if (error) return <div className="error">{error}</div>;

	return (
		<div className="ride-list-container" aria-live="polite">
			<div className="ride-stats">
				<SearchBarRide
					onSearchChange={(value) => setSearchTerm(value)}
					onFilterChange={(filter) => setActiveFilter(filter)}
				/>
				<h2>{filteredRides.length} ATTRACTIONS</h2>
				<h3>Attractions ouvertes : {openRides.length}</h3>
			</div>

			<ul className="ride-list">
				{openRides.map((ride, index) => (
					<RideItem
						key={ride.id}
						ride={ride}
						index={index}
						favorites={favoriteRides}
						onToggle={addFavorite}
						doneRideIds={doneRideIds}
						toggleDone={toggleDone}
					/>
				))}
			</ul>

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
							<RideItem
								key={ride.id}
								ride={ride}
								favorites={favoriteRides}
								onToggle={addFavorite}
								doneRideIds={doneRideIds}
								toggleDone={toggleDone}
							/>
						))}
					</ul>
				</section>
			)}
		</div>
	);
}

export default RideList;
