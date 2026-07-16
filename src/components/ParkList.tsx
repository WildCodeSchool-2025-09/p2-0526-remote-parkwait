import { useEffect, useState } from "react";
import favIconFilled from "../asset/img/icons/favfull.svg";
import ParkCard from "./ParkCard";
import ParkFilter from "./ParkFilter";
import "../css/Parklist.css";
import type { ParkGroup, ParkListProps } from "../types";

function ParkList({
	searchTerm,
	favoriteParks,
	addFavoritePark,
}: ParkListProps) {
	const [allParksData, setAllParksData] = useState<ParkGroup[]>([]);
	const [selectedCountry, setSelectedCountry] = useState("All");
	const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

	useEffect(() => {
		fetch("/api/parks.json")
			.then((res) => res.json())
			.then((data) => {
				setAllParksData(data);
			})
			.catch((err) => console.error("Erreur API :", err));
	}, []);

	const allParksList = allParksData.flatMap((company) => company.parks || []);
	const countries = ["All", ...new Set(allParksList.map((p) => p.country))];

	const filteredParks = allParksList.filter((park) => {
		const matchesName = park.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesCountry =
			selectedCountry === "All" || park.country === selectedCountry;
		const matchesFavorite =
			!showFavoritesOnly || favoriteParks.some((fav) => fav.id === park.id);
		return matchesName && matchesCountry && matchesFavorite;
	});

	return (
		<div className="park-list-container">
			<div className="park-list-filters">
				<ParkFilter
					countries={countries}
					selectedCountry={selectedCountry}
					onFilterChange={setSelectedCountry}
				/>
				<button
					type="button"
					className={`filter-trigger${showFavoritesOnly ? " active" : ""}`}
					onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
					aria-pressed={showFavoritesOnly}
				>
					<img src={favIconFilled} alt="" className="btn-icon" />
					Favorite parks
				</button>
			</div>

			{showFavoritesOnly && filteredParks.length === 0 ? (
				<p className="loading-text">
					You haven't added any parks to your favorites yet. Click the heart on
					a park to add it here.
				</p>
			) : (
				<div className="park-list-grid">
					{filteredParks.map((park) => (
						<ParkCard
							key={park.id}
							park={park}
							favoriteParks={favoriteParks}
							addFavoritePark={addFavoritePark}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default ParkList;
