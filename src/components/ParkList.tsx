import { useEffect, useState } from "react";
import ParkFilter from "./ParkFilter.jsx";
import "../css/Parklist.css";

function ParkList({ searchTerm }) {
	const [allParksData, setAllParksData] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState("All");

	useEffect(() => {
		fetch("https://queue-times.com/parks.json")
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
						<h3>{park.name}</h3>
						<p>{park.country}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default ParkList;
