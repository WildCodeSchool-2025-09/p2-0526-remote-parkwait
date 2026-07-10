export interface Ride {
	id: number;
	name: string;
	is_open: boolean;
	wait_time: number;
	category: string;
	land: string;
	last_updated: string;
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

export interface ParkGroup {
	id: number;
	name: string;
	parks: Park[];
}

export interface Land {
	id: number;
	name: string;
	rides: Ride[];
}

export interface ParkQueueData {
	lands: Land[];
	rides: Ride[];
}

export interface GroupedLand {
	name: string;
	rides: Ride[];
}

export interface ParkSummary {
	id: number;
	name: string;
	country: string;
	isOpen: boolean;
	closingTime: string;
	affluence: AffluenceLevel;
	openRidesCount: number;
	// total aussi ?
}

export interface FavoriteEntry {
	rideId: number;
	parkId: number;
	rideName: string;
	addedAt: string;
}

export interface RideItemProps {
	ride: Ride;
	index?: number;
	variant?: "open" | "closed";
	hideCategory?: boolean;
	favorites: Ride[];
	onToggle: (ride: Ride) => void;
}

export interface FavoriteButtonProps {
	item: Ride;
	favorites: Ride[];
	onToggle: (ride: Ride) => void;
}

export interface HiddenButtonProps {
	rideName: string;
}

export interface LandSectionProps {
	land: GroupedLand;
}

export interface SearchBarRideProps {
	onSearchChange: (term: string) => void;
	onFilterChange: (filter: FilterType) => void;
}

export interface FilterButtonProps {
	label: string;
	isActive: boolean;
	onClick: () => void;
}
export interface ParkFilterProps {
	countries: string[];
	selectedCountry: string;
	onFilterChange: (country: string) => void;
}

export interface ParkListProps {
	searchTerm: string;
	favoriteParks: Park[];
	addFavoritePark: (park: Park) => void;
}

export interface SearchBarProps {
	onSearch: (value: string) => void;
}

export type FilterType = "all" | "theme";
export type AffluenceLevel = "Faible" | "Moderée" | "Elevée";
