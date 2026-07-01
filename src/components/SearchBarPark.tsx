import "../css/index.css";
import searchIcon from "../../public/icons/search.svg";

function SearchBarPark({ onSearch }) {
	return (
		<div className="search-container">
			<img src={searchIcon} alt="Recherche" className="search-icon" />
			<input
				className="search-input"
				type="text"
				placeholder="Rechercher un parc..."
				onChange={(e) => onSearch(e.target.value)}
			/>
		</div>
	);
}

export default SearchBarPark;
