import type { RideWithCategory } from "./hooks/useParkRides";

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

export type FilterType = "All" | "Theme" | "Favorites";

export interface SearchBarRideProps {
	onSearchChange: (term: string) => void;
	onFilterChange: (filter: FilterType) => void;
}
export interface FilterButtonProps {
	label: string;
	isActive: boolean;
	onClick: () => void;
	icon?: string;
	plainIcon?: string;
}

export interface GroupedLand {
	name: string;
	rides: RideWithCategory[];
}

export interface RideItemProps {
	ride: RideWithCategory;
	index?: number;
	variant?: "open" | "closed" | "done" | "hidden";
	hideCategory?: boolean;
	addFavorite: (ride: Ride) => void;
	favoriteRides: Ride[];
	doneRideIds: number[];
	toggleDone: (id: number) => void;
	hiddenRideIds: number[];
	toggleHidden: (id: number) => void;
}

export interface LandSectionProps {
	land: GroupedLand;
	addFavorite: (ride: Ride) => void;
	favoriteRides: Ride[];
	doneRideIds: number[];
	toggleDone: (id: number) => void;
	hiddenRideIds: number[];
	toggleHidden: (id: number) => void;
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
	value: string;
	onSearch: (value: string) => void;
}

export type AffluenceLevel = "Low" | "Moderate" | "High";

export interface ParkSummary {
	id: number;
	name: string;
	country: string;
	isOpen: boolean;
	closingTime: string;
	affluence: AffluenceLevel;
	openRidesCount: number;
	totalRidesCount: number;
	averageWaitTime: number;
	latitude: number;
	longitude: number;
}

export interface FavoriteButtonProps {
	rideName: string;
}
export interface HiddenButtonProps {
	ride: Ride;
	hiddenRideIds: number[];
	toggleHidden: (id: number) => void;
}

export interface WeatherData {
    temperature: number;
    weatherCode: number;
    isDay: boolean;
}