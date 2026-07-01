import "../css/ShowParksCard.css";
import type { ParkCompany } from "../types";
import ParkCard from "./ParkCard";

function ShowParksCard({ park }: { park: ParkCompany[] }) {
	return (
		<section className="ShowParksCardContainer">
			{park.map((company) =>
				company.parks.map((parkItem) => (
					<ParkCard key={parkItem.id} park={parkItem} />
				)),
			)}
		</section>
	);
}

export default ShowParksCard;
