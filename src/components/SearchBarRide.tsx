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
				<img src={searchIcon} alt="Recherche" className="search-icon" />
				<input
					type="text"
					aria-label="rechecher une attraction"
					placeholder="Rechercher une attraction..."
					value={searchTerm}
					onChange={handleSearch}
					className="search-ride-input"
				/>
			</div>

			<div className="filter-buttons">
				<FilterButton
					label="Toutes"
					icon={worldIcon}
					isActive={activeFilter === "Toutes"}
					onClick={() => handleFilterClick("Toutes")}
				/>
				<FilterButton
					label="Thème"
					icon={tagThemeIcon}
					isActive={activeFilter === "Thème"}
					onClick={() => handleFilterClick("Thème")}
				/>
				<FilterButton
					label="Favoris"
					plainIcon={favFullIcon}
					isActive={activeFilter === "Favoris"}
					onClick={() => handleFilterClick("Favoris")}
				/>
			</div>
		</div>
	);
}

export default SearchBarRide;
