import { useEffect, useState } from "react";
import type { ParkSummary, Park as ParkType } from "../types";
import { getParkSummary } from "../utils/parkSummary";

export function useParkSummary(parkId: string | undefined) {
	const [summary, setSummary] = useState<ParkSummary | null>(null);

	useEffect(() => {
		async function loadPark() {
			const response = await fetch("/api/parks.json");
			const groups = await response.json();
			const allParks: ParkType[] = groups.flatMap(
				(group: { parks: ParkType[] }) => group.parks,
			);

			const foundPark = allParks.find((park) => park.id === Number(parkId));

			if (foundPark === undefined) {
				return;
			}

			const result = await getParkSummary(foundPark);
			setSummary(result);
		}

		loadPark();
	}, [parkId]);

	return summary;
}
