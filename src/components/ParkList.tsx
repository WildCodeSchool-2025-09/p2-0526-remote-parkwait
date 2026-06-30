import { useState, useEffect } from "react";

function ParkList({ searchTerm }) {
	const [allParks, setAllParks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("https://queue-times.com/parks.json")
			.then((res) => {
				if (!res.ok) throw new Error("Erreur réseau");
				return res.json();
			})
			.then((data) => {
				setAllParks(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Erreur API :", err);
				setLoading(false);
			});
	}, []);
	const filteredParks = allParks.filter((park) =>
		park.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	if (loading) return <p>Chargement des parcs...</p>;

	return (
		<div>
			<ul>
				{filteredParks.map((park) => (
					<li key={park.id}>{park.name}</li>
				))}
			</ul>
		</div>
	);
}

export default ParkList;
