import "../css/index.css";
import searchIcon from "../asset/img/icons/search.svg";
import type { SearchBarProps } from "../types";

function SearchBarPark({ value, onSearch }: SearchBarProps) {
	return (
		<div className="search-container">
			<div className="search-input-wrapper">
				<img src={searchIcon} alt="Search" className="search-icon" />
				<input
					className="search-input"
					type="text"
					aria-label="park search"
					placeholder="Search for a park..."
					value={value}
					onChange={(e) => onSearch(e.target.value)}
				/>
			</div>
		</div>
	);
}

export default SearchBarPark;