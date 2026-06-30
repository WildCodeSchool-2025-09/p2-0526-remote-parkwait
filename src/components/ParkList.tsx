import { useEffect, useState } from "react";
import "../css/Parklist.css";

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
        <div className="park-list-grid">
            {filteredParks.map((park) => (
                <div key={park.id} className="park-card">
                    <h3 className="park-name">{park.name}</h3>
                </div>
            ))}
        </div>
	);
}

export default ParkList;
