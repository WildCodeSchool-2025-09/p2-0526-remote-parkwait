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

export interface Ride {
	id: number;
	name: string;
	is_open: boolean;
	wait_time: number;
	last_updated: string;
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
export interface ParkListProps {
	searchTerm: string;
	favoriteParks: Park[];
	addFavoritePark: (park: Park) => void;
}

export interface ParkFilterProps {
	countries: string[];
	selectedCountry: string;
	onFilterChange: (country: string) => void;
}

export interface SearchBarProps {
	onSearch: (value: string) => void;
}

export type AffluenceLevel = "Faible" | "Moderée" | "Elevée";

export interface ParkSummary {
	id: number;
	name: string;
	country: string;
	isOpen: boolean;
	closingTime: string;
	affluence: AffluenceLevel;
}
