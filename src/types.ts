import type { RideWithCategory } from "../hooks/useParkRides";

export interface ParkGroup {
	id: number;
	name: string;
	parks: Park[];
}

export interface Park {
	id: number;
	name: string;
	country: string;
	continent: string;
	latitude: string;
	longitude: string;
	timezone: string;
}

export interface ParkQueueData {
	lands: Land[];
	rides: Ride[];
}

export interface Land {
	id: number;
	name: string;
	rides: Ride[];
}

export interface FavoriteEntry {
	rideId: number;
	parkId: number;
	rideName: string;
	addedAt: string;
}

export type FilterType = "Toutes" | "Thème";

export interface SearchBarRideProps {
	onSearchChange: (term: string) => void;
	onFilterChange: (filter: FilterType) => void;
}
export interface FilterButtonProps {
	label: string;
	isActive: boolean;
	onClick: () => void;
}

export interface Ride {
	id: number;
	name: string;
	category: string;
	land: string;
	wait_time: number;
	is_open: boolean;
}
export interface GroupedLand {
	name: string;
	rides: RideWithCategory[];
}

export interface RideItemProps {
	ride: RideWithCategory;
	index?: number;
	variant?: "open" | "closed";
	hideCategory?: boolean;
}

export interface LandSectionProps {
	land: GroupedLand;
}
