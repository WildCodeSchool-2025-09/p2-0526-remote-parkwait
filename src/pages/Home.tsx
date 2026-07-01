import "../css/Home.css";
import type { ParkCompany } from "../types";
import ShowParks from "./ShowParks.tsx";

function Home({ park }: { park: ParkCompany[] }) {
	return (
		<>
			<ShowParks park={park} />
		</>
	);
}

export default Home;
