import "../css/index.css";

function SearchBarPark({ onSearch }) {
	return (
		<input
			className="search-bar-input"
			type="text"
			placeholder="Rechercher un parc..."
			onChange={(e) => {
				console.log("texte tapé dans l'input :", e.target.value);
				onSearch(e.target.value);
			}}
		/>
	);
}

export default SearchBarPark;
