import { useSearchBarRide } from "../hooks/useSearchBarRide";
import type { SearchBarRideProps } from "../types";
import FilterButton from "./FilterButton";
import "../css/SearchBarRide.css";
import favFullIcon from "../asset/img/icons/favfull.svg";
import searchIcon from "../asset/img/icons/search.svg";
import tagThemeIcon from "../asset/img/icons/tagtheme.svg";
import worldIcon from "../asset/img/icons/world.svg";

function SearchBarRide({ onSearchChange, onFilterChange }: SearchBarRideProps) {
	const { searchTerm, activeFilter, handleSearch, handleFilterClick } =
		useSearchBarRide({ onSearchChange, onFilterChange });

	return (
		<div className="search-ride-container">
			<div className="search-input-wrapper">
				<img src={searchIcon} alt="Search" className="search-icon" />
				<input
					type="text"
					aria-label="search for an attraction"
					placeholder="Search for an attraction..."
					value={searchTerm}
					onChange={handleSearch}
					className="search-ride-input"
				/>
			</div>

			<div className="filter-buttons">
				<FilterButton
					label="All"
					icon={worldIcon}
					isActive={activeFilter === "All"}
					onClick={() => handleFilterClick("All")}
				/>
				<FilterButton
					label="Theme"
					icon={tagThemeIcon}
					isActive={activeFilter === "Theme"}
					onClick={() => handleFilterClick("Theme")}
				/>
				<FilterButton
					label="Favorites"
					plainIcon={favFullIcon}
					isActive={activeFilter === "Favorites"}
					onClick={() => handleFilterClick("Favorites")}
				/>
			</div>
		</div>
	);
}

export default SearchBarRide;
