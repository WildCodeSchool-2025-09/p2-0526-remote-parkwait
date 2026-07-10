import type {
	AffluenceLevel,
	Park,
	ParkQueueData,
	ParkSummary,
	Ride,
} from "../types";

function getAllRides(data: ParkQueueData): Ride[] {
	const ridesFromLands = data.lands.flatMap((land) => land.rides);
	return [...data.rides, ...ridesFromLands];
}

function isParkOpen(allRides: Ride[]): boolean {
	return allRides.some((ride) => ride.is_open);
}

function getOpenRidesCount(allRides: Ride[]): number {
	return allRides.filter((ride) => ride.is_open).length;
}

function getAverageWaitTime(allRides: Ride[]): number {
	const openRides = allRides.filter((ride) => ride.is_open);

	if (openRides.length === 0) {
		return 0;
	}

	const totalWait = openRides.reduce((sum, ride) => sum + ride.wait_time, 0);
	return totalWait / openRides.length;
}

function getAffluenceLevel(averageWait: number): AffluenceLevel {
	if (averageWait < 20) {
		return "Faible";
	}
	if (averageWait <= 40) {
		return "Moderée";
	}
	return "Elevée";
}

export async function getParkSummary(park: Park): Promise<ParkSummary> {
	const response = await fetch(`/api/parks/${park.id}/queue_times.json`);
	const data: ParkQueueData = await response.json();

	const allRides = getAllRides(data);
	const open = isParkOpen(allRides);
	const average = getAverageWaitTime(allRides);
	const affluence = getAffluenceLevel(average);

	return {
		id: park.id,
		name: park.name,
		country: park.country,
		isOpen: open,
		closingTime: `22h - ${park.country}`,
		affluence: affluence,
		openRidesCount: getOpenRidesCount(allRides),
		totalRidesCount: allRides.length,
		averageWaitTime: average,
	};
}
