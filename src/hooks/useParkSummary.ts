import { useEffect, useState } from "react";
import type { ParkGroup, ParkSummary } from "../types";
import { getParkSummary } from "../utils/parkSummary";

export function useParkSummary(id: string | undefined) {
	const parkId = id ? Number(id) : undefined;
	const [summary, setSummary] = useState<ParkSummary | null>(null);

	useEffect(() => {
		async function loadPark() {
			if (parkId === undefined || Number.isNaN(parkId)) {
				return;
			}

			const response = await fetch("/api/parks.json");
			const groups: ParkGroup[] = await response.json();
			const allParks = groups.flatMap((group) => group.parks);

			const foundPark = allParks.find((park) => park.id === parkId);

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
