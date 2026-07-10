import type { ParkGroup } from "../types";
import type { Park } from "../types";

export const fetchParksData = async (): Promise<ParkGroup[]> => {
	const response = await fetch("https://queue-times.com/parks.json");
	if (!response.ok) {
		throw new Error("Erreur réseau lors de la récupération des parcs");
	}
	return response.json();
};

export const getUniqueCountries = (allParksList: Park[]): string[] => {
	return ["All", ...new Set(allParksList.map((p) => p.country))];
};

export const filterParks = (
	parks: Park[],
	selectedCountry: string,
	searchTerm: string,
): Park[] => {
	return parks.filter((park: Park) => {
		const matchesName = park.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesCountry =
			selectedCountry === "All" || park.country === selectedCountry;
		return matchesName && matchesCountry;
	});
};
