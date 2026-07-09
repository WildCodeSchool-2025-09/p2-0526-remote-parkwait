import "../css/index.css";
import searchIcon from "../../public/icons/search.svg";
import type { SearchBarProps } from "../types";

function SearchBarPark({ onSearch }: SearchBarProps) {
	return (
		<div className="search-container">
			<img src={searchIcon} alt="Recherche" className="search-icon" />
			<input
				className="search-input"
				type="text"
				aria-label="recherche de parc"
				placeholder="Rechercher un parc..."
				onChange={(e) => onSearch(e.target.value)}
			/>
		</div>
	);
}

export default SearchBarPark;
