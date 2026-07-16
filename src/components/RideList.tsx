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
	hiddenRideIds,
	toggleHidden,
}: {
	parkId: number;
	addFavorite: (ride: Ride) => void;
	favoriteRides: Ride[];
	doneRideIds: number[];
	toggleDone: (id: number) => void;
	hiddenRideIds: number[];
	toggleHidden: (id: number) => void;
}) {
	const { rides, isLoading, error } = useParkRides(parkId);
	const [searchTerm, setSearchTerm] = useState("");
	const [activeFilter, setActiveFilter] = useState<FilterType>("All");
	const [isOpenListOpen, setIsOpenListOpen] = useState(true);
	const [isClosedOpen, setIsClosedOpen] = useState(false);
	const [isDoneOpen, setIsDoneOpen] = useState(false);
	const [isHiddenOpen, setIsHiddenOpen] = useState(false);

	const isFavorite = (ride: { id: number }) =>
		favoriteRides.some((fav) => fav.id === ride.id);

	const openRides = rides
		.filter(
			(ride) =>
				ride.is_open &&
				!doneRideIds.some((rideId) => rideId === ride.id) &&
				!hiddenRideIds.some((rideId) => rideId === ride.id),
		)
		.sort((a, b) => a.wait_time - b.wait_time);

	const closedRides = rides.filter(
		(ride) =>
			!ride.is_open &&
			!doneRideIds.some((rideId) => rideId === ride.id) &&
			!hiddenRideIds.some((rideId) => rideId === ride.id),
	);

	const doneRides = rides.filter(
		(ride) =>
			doneRideIds.some((rideId) => rideId === ride.id) &&
			!hiddenRideIds.some((rideId) => rideId === ride.id),
	);

	const hiddenRides = rides.filter((ride) =>
		hiddenRideIds.some((rideId) => rideId === ride.id),
	);

	const searchedOpenRides = openRides.filter((ride) =>
		ride.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const filteredOpenRides =
		activeFilter === "Favorites"
			? searchedOpenRides.filter(isFavorite)
			: searchedOpenRides;

	const displayedClosedRides =
		activeFilter === "Favorites" ? closedRides.filter(isFavorite) : closedRides;

	const displayedDoneRides =
		activeFilter === "Favorites" ? doneRides.filter(isFavorite) : doneRides;

	const displayedHiddenRides =
		activeFilter === "Favorites" ? hiddenRides.filter(isFavorite) : hiddenRides;

	const hasNoFavorites =
		activeFilter === "Favorites" &&
		filteredOpenRides.length === 0 &&
		displayedClosedRides.length === 0 &&
		displayedDoneRides.length === 0 &&
		displayedHiddenRides.length === 0;

	const groupedLands = groupRidesByLand(filteredOpenRides);

	if (isLoading) return <p aria-live="polite">Loading attractions...</p>;
	if (error) return <div className="error">{error}</div>;

	return (
		<div className="ride-list-container" aria-live="polite">
			<div className="ride-stats">
				<SearchBarRide
					onSearchChange={setSearchTerm}
					onFilterChange={setActiveFilter}
				/>
				<h2>{rides.length} ATTRACTIONS</h2>
				<h3>Open attractions: {openRides.length}</h3>
			</div>

			{hasNoFavorites && (
				<p className="loading-text">
					You haven't added any attractions to your favorites yet. Click the
					heart on an attraction to add it here.
				</p>
			)}

			{activeFilter === "Theme" ? (
				groupedLands.map((land) => (
					<LandSection
						key={land.name}
						land={land}
						addFavorite={addFavorite}
						favoriteRides={favoriteRides}
						doneRideIds={doneRideIds}
						toggleDone={toggleDone}
						hiddenRideIds={hiddenRideIds}
						toggleHidden={toggleHidden}
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
						<h2>OPEN ({filteredOpenRides.length})</h2>
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
									hiddenRideIds={hiddenRideIds}
									toggleHidden={toggleHidden}
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
						<h2>DONE ({displayedDoneRides.length})</h2>
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
									hiddenRideIds={hiddenRideIds}
									toggleHidden={toggleHidden}
								/>
							))}
						</ul>
					)}
				</section>
			)}

			{displayedHiddenRides.length > 0 && (
				<section className="hidden-rides-section">
					<button
						type="button"
						className="section-toggle"
						onClick={() => setIsHiddenOpen((prev) => !prev)}
						aria-expanded={isHiddenOpen}
					>
						<h2>HIDDEN ({displayedHiddenRides.length})</h2>
						<span className={`chevron ${isHiddenOpen ? "open" : ""}`}>▾</span>
					</button>
					{isHiddenOpen && (
						<ul className="ride-list hidden-list">
							{displayedHiddenRides.map((ride) => (
								<RideItem
									key={ride.id}
									ride={ride}
									variant="hidden"
									addFavorite={addFavorite}
									favoriteRides={favoriteRides}
									doneRideIds={doneRideIds}
									toggleDone={toggleDone}
									hiddenRideIds={hiddenRideIds}
									toggleHidden={toggleHidden}
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
						<h2>CLOSED ({displayedClosedRides.length})</h2>
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
									hiddenRideIds={hiddenRideIds}
									toggleHidden={toggleHidden}
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
