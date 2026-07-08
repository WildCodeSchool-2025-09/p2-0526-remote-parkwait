import { useEffect, useState } from "react";
import type { ParkQueueData, Ride } from "../types.js";

export interface RideWithCategory extends Ride {
	category: string;
}

export const useParkRides = (parkId: number) => {
	const [rides, setRides] = useState<RideWithCategory[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchParkData = async () => {
			try {
				const response = await fetch(`/api/parks/${parkId}/queue_times.json`);
				if (!response.ok) throw new Error("Erreur API");

				const data: ParkQueueData = await response.json();

				const ridesWithoutLand: RideWithCategory[] = (data.rides || []).map(
					(ride) => ({
						...ride,
						category: "Général",
					}),
				);
				const ridesFromLands: RideWithCategory[] = (data.lands || []).flatMap(
					(land) =>
						land.rides.map((ride) => ({
							...ride,
							category: land.name,
						})),
				);
				setRides([...ridesWithoutLand, ...ridesFromLands]);
				setError(null);
			} catch (err) {
				console.error(err);
				setError("Impossible de charger les attractions.");
			} finally {
				setIsLoading(false);
			}
		};
		fetchParkData();
		const intervalId = setInterval(fetchParkData, 300000);

		return () => clearInterval(intervalId);
	}, [parkId]);
	return { rides, isLoading, error };
};
