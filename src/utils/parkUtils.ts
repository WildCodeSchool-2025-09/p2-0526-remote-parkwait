import type { ParkGroup } from "../types";
import type { Park } from "../types";

// Util 1 : Appel à l'API
export const fetchParksData = async (): Promise<ParkGroup[]> => {
	const response = await fetch("https://queue-times.com/parks.json");
	if (!response.ok) {
		throw new Error("Erreur réseau lors de la récupération des parcs");
	}
	return response.json();
};

export const getUniqueCountries = (allParksList: []): string[] => {
	return ["All", ...new Set(allParksList.map((p) => p.country))];
};

export const filterParks = (
	parks: [],
	searchTerm: string,
	selectedCountry: string,
) => {
	return parks.filter((park) => {
		const matchesName = park.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesCountry =
			selectedCountry === "All" || park.country === selectedCountry;
		return matchesName && matchesCountry;
	});
};
