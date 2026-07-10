import ShowParksCard from "../components/ShowParksCard.tsx";
import type { ParkGroup } from "../types";
import "../css/ShowParks.css";

function ShowParks({ parkCompanies }: { parkCompanies: ParkGroup[] }) {
	return (
		<section>
			<article className="ShowParks">
				<label htmlFor="park-search" className="sr-only">
					Search for a park
				</label>
				<input
					id="park-search"
					className="ShowParks-searchBar"
					type="text"
					placeholder="Search for a park..."
				/>
				<ShowParksCard parkCompanies={parkCompanies} />
			</article>
		</section>
	);
}

export default ShowParks;
