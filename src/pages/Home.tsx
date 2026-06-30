import "../css/Home.css";
import type { ParkCompany } from "../component/ShowParksCard.tsx";
import ShowParks from "./ShowParks.tsx";

function Home({ park }: { park: ParkCompany[] }) {
	return (
		<>
			<ShowParks park={park} />
		</>
	);
}

export default Home;
