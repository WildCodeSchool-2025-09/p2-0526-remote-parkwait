import ShowParksCard from "../component/ShowParksCard.tsx";
import type { ParkCompany } from "../component/ShowParksCard.tsx";
import "../css/ShowParks.css";

function ShowParks({ park }: { park: ParkCompany[] }) {
	return (
		<section>
			<article className="ShowParks">
				<input
					className="ShowParks-searchBar"
					type="text"
					placeholder="Search for a park..."
				/>
				<ShowParksCard park={park} />
			</article>
		</section>
	);
}

export default ShowParks;
