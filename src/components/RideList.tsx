import { useState } from "react";
import { useParkRides } from "../hooks/useParkRides";
import type { Ride } from "../types";
import { byWaitTime } from "../utils/rideUtils";
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
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");

	const openRides = rides.filter((ride) => ride.is_open).sort(byWaitTime);
	const closedRides = rides.filter((ride) => !ride.is_open);

    // Filtrage basé sur la recherche et la catégorie
    const filteredRides = rides.filter((ride) => {
        const matchesSearch = ride.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = activeFilter === "all" || ride.category === activeFilter;
        return matchesSearch && matchesFilter;
    });

    // On divise la liste filtrée en deux catégories
    const openRides = filteredRides.filter((ride) => ride.is_open);
    const closedRides = filteredRides.filter((ride) => !ride.is_open);

    if (isLoading) return <p aria-live="polite">Chargement des attractions...</p>;
    if (error) return <div className="error">{error}</div>;
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
                            />
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}

export default RideList;