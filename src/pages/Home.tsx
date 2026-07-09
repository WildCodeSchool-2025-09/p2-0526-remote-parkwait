import { useState } from "react";
import ParkList from "../components/ParkList.tsx";
import SearchBarPark from "../components/SearchBarPark";

function Home() {
	const [searchTerm, setSearchTerm] = useState("");
	return (
		<>
			<SearchBarPark onSearch={setSearchTerm} />
			<ParkList searchTerm={searchTerm} />
		</>
	);
}

export default Home;
