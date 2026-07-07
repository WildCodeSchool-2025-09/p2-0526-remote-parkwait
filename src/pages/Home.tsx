import { useState } from "react";
import ParkList from "../components/ParkList.tsx";
import SearchBarPark from "../components/SearchBarPark";

function Home() {
	const [searchTerm, setSearchTerm] = useState("");
	return (
		<>
			<h1>ParkWait</h1>
			<SearchBarPark onSearch={setSearchTerm} />
			<ParkList searchTerm={searchTerm} />
		</>
	);
}

export default Home;
