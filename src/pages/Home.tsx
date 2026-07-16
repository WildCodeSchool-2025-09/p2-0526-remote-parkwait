import ParkList from "../components/ParkList.tsx";
import SearchBarPark from "../components/SearchBarPark";
import type { Park } from "../types.ts";

function Home({
	favoriteParks,
	addFavoritePark,
	searchTerm,
	setSearchTerm,
}: {
	favoriteParks: Park[];
	addFavoritePark: (park: Park) => void;
	searchTerm: string;
	setSearchTerm: (term: string) => void;
}) {
	return (
		<>
			<SearchBarPark value={searchTerm} onSearch={setSearchTerm} />
			<ParkList
				searchTerm={searchTerm}
				favoriteParks={favoriteParks}
				addFavoritePark={addFavoritePark}
			/>
		</>
	);
}

export default Home;