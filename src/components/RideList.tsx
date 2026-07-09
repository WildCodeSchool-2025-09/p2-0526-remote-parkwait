import { useState } from "react";
import { useParkRides } from "../hooks/useParkRides";
import type { FilterType, Ride } from "../types";
import { groupRidesByLand } from "../utils/rideUtils";
import LandSection from "./LandSection";
import RideItem from "./RideItem";
import SearchBarRide from "./SearchBarRide";
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
	const [searchTerm, setSearchTerm] = useState("");
	const [activeFilter, setActiveFilter] = useState<FilterType>("Toutes");

	const openRides = rides.filter((ride) => ride.is_open);
	const closedRides = rides.filter((ride) => !ride.is_open);

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
							/>
						))}
					</ul>
				</section>
			)}
		</div>
	);
}

export default RideList;
