import { type ChangeEvent, useState } from "react";
import type { FilterType, SearchBarRideProps } from "../types";

export function useSearchBarRide({
	onSearchChange,
	onFilterChange,
}: SearchBarRideProps) {
	const [searchTerm, setSearchTerm] = useState("");
	// Mise à jour de la valeur initiale ici
	const [activeFilter, setActiveFilter] = useState<FilterType>("all");

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		onSearchChange(value);
	};

	const handleFilterClick = (filter: FilterType) => {
		setActiveFilter(filter);
		onFilterChange(filter);
	};

	return {
		searchTerm,
		activeFilter,
		handleSearch,
		handleFilterClick,
	};
}
