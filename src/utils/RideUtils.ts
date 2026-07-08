import type { RideWithCategory } from "../hooks/useParkRides";
import type { GroupedLand } from "../types";

export function getWaitTimeClass(waitTime: number): string {
	if (waitTime <= 20) return "wait-low";
	if (waitTime <= 45) return "wait-medium";
	return "wait-high";
}

export function groupRidesByLand(rides: RideWithCategory[]): GroupedLand[] {
	const map = new Map<string, RideWithCategory[]>();
	for (const ride of rides) {
		const landName = ride.category || "Autres attractions";
		if (!map.has(landName)) map.set(landName, []);
		map.get(landName)?.push(ride);
	}
	return Array.from(map.entries()).map(([name, rides]) => ({ name, rides }));
}

const LAND_ICONS: Record<string, string> = {
	fantasyland: "/icons/lands/fantasyland.webp",
	"main-street-u.s.a": "/icons/lands/main-street-usa.webp",
	adventureland: "/icons/lands/adventureland.webp",
	frontierland: "/icons/lands/frontierland.webp",
	discoveryland: "/icons/lands/discoveryland.webp",
};

export function getLandIcon(landName: string): string {
	const key = landName.toLowerCase().replace(/\s+/g, "-");
	const match = Object.keys(LAND_ICONS).find((k) => key.includes(k));
	return match ? LAND_ICONS[match] : "/icons/lands/attraction.svg";
}
