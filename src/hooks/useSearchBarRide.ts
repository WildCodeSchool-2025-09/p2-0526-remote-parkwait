import { type ChangeEvent, useState } from "react";
import type { FilterType, SearchBarRideProps } from "../types";

export function useSearchBarRide({
	onSearchChange,
	onFilterChange,
}: SearchBarRideProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [activeFilter, setActiveFilter] = useState<FilterType>("Toutes");

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
