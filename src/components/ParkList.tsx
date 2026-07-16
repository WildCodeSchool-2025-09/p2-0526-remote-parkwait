import { useEffect, useState } from "react";
import FavoriteButton from "./FavoriteButton";
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

			<ul className="park-list-grid">
				{filteredParks.map((park) => (
					<li key={park.id}>
						<ParkCard park={park}>
							<FavoriteButton
								item={park}
								favorites={favoriteParks}
								onToggle={addFavoritePark}
							/>
						</ParkCard>
					</li>
				))}
			</ul>
		</div>
	);
}

export default ParkList;
