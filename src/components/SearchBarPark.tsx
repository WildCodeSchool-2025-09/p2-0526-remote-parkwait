import "../css/index.css";

function SearchBarPark({ onSearch }) {
	return (
        <div className="search-container">
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
