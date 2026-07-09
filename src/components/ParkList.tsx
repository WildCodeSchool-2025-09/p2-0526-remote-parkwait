import { useEffect, useState } from "react";
import ParkFavoriteButton from "./ParkFavoriteButton";
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
		return matchesName && matchesCountry;
	});

	return (
		<div>
			<ParkFilter
				countries={countries}
				selectedCountry={selectedCountry}
				onFilterChange={setSelectedCountry}
			/>

			<div className="park-list-grid">
				{filteredParks.map((park) => (
					<div key={park.id} className="park-card">
						<h3 className="park-name">{park.name}</h3>
						<p className="park-country">{park.country}</p>
						<ParkFavoriteButton
							park={park}
							addFavoritePark={addFavoritePark}
							favoriteParks={favoriteParks}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default ParkList;
