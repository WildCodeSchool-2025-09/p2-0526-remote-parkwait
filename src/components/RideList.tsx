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
	const [isOpenListOpen, setIsOpenListOpen] = useState(true);
	const [isClosedOpen, setIsClosedOpen] = useState(false);
	const [isDoneOpen, setIsDoneOpen] = useState(false);

	const isFavorite = (ride: { id: number }) =>
		favoriteRides.some((fav) => fav.id === ride.id);

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

	const searchedOpenRides = openRides.filter((ride) =>
		ride.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const filteredOpenRides =
		activeFilter === "Favoris"
			? searchedOpenRides.filter(isFavorite)
			: searchedOpenRides;

	const displayedClosedRides =
		activeFilter === "Favoris" ? closedRides.filter(isFavorite) : closedRides;

	const displayedDoneRides =
		activeFilter === "Favoris" ? doneRides.filter(isFavorite) : doneRides;

	const hasNoFavorites =
		activeFilter === "Favoris" &&
		filteredOpenRides.length === 0 &&
		displayedClosedRides.length === 0 &&
		displayedDoneRides.length === 0;

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
				<h2>{rides.length} ATTRACTIONS</h2>
				<h3>Attractions ouvertes : {openRides.length}</h3>
			</div>

			{hasNoFavorites && (
				<p className="loading-text">
					Vous n'avez pas encore ajouté d'attraction en favoris. Cliquez sur le
					cœur d'une attraction pour l'ajouter ici.
				</p>
			)}

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
				<section className="open-rides-section">
					<button
						type="button"
						className="section-toggle"
						onClick={() => setIsOpenListOpen((prev) => !prev)}
						aria-expanded={isOpenListOpen}
					>
						<h2>OUVERTES ({filteredOpenRides.length})</h2>
						<span className={`chevron ${isOpenListOpen ? "open" : ""}`}>▾</span>
					</button>
					{isOpenListOpen && (
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
				</section>
			)}

			{displayedDoneRides.length > 0 && (
				<section className="done-rides-section">
					<button
						type="button"
						className="section-toggle"
						onClick={() => setIsDoneOpen((prev) => !prev)}
						aria-expanded={isDoneOpen}
					>
						<h2>TERMINÉES ({displayedDoneRides.length})</h2>
						<span className={`chevron ${isDoneOpen ? "open" : ""}`}>▾</span>
					</button>
					{isDoneOpen && (
						<ul className="ride-list done-list">
							{displayedDoneRides.map((ride) => (
								<RideItem
									key={ride.id}
									ride={ride}
									variant="done"
									addFavorite={addFavorite}
									favoriteRides={favoriteRides}
									doneRideIds={doneRideIds}
									toggleDone={toggleDone}
								/>
							))}
						</ul>
					)}
				</section>
			)}

			{displayedClosedRides.length > 0 && (
				<section className="closed-rides-section">
					<button
						type="button"
						className="section-toggle"
						onClick={() => setIsClosedOpen((prev) => !prev)}
						aria-expanded={isClosedOpen}
					>
						<h2>FERMÉES ({displayedClosedRides.length})</h2>
						<span className={`chevron ${isClosedOpen ? "open" : ""}`}>▾</span>
					</button>
					{isClosedOpen && (
						<ul className="ride-list closed-list">
							{displayedClosedRides.map((ride) => (
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
					)}
				</section>
			)}
		</div>
	);
}

export default RideList;
