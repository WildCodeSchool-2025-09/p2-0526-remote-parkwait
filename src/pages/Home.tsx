import "../css/Home.css";
import type { ParkCompany } from "../types";
import ShowParks from "./ShowParks.tsx";

function Home({ parkCompanies }: { parkCompanies: ParkCompany[] }) {
	return (
		<>
			<ShowParks parkCompanies={parkCompanies} />
		</>
	);
}

export default Home;
