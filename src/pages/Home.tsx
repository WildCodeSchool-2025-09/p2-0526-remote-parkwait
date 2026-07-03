import { useState } from "react";
import ParkList from "../components/ParkList.tsx";
import SearchBarPark from "../components/SearchBarPark";
import type { Park } from "../types.ts";

function Home({
	favoriteParks,
	addFavoritePark,
}: {
	favoriteParks: Park[];
	addFavoritePark: (park: Park) => void;
}) {
	const [searchTerm, setSearchTerm] = useState("");
	return (
		<>
			<h1>ParkWait</h1>
			<SearchBarPark onSearch={setSearchTerm} />
			<ParkList
				searchTerm={searchTerm}
				favoriteParks={favoriteParks}
				addFavoritePark={addFavoritePark}
			/>
		</>
	);
}

export default Home;
