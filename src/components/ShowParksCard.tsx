import "../css/ShowParksCard.css";
import type { ParkCompany } from "../types";
import ParkCard from "./ParkCard";

function ShowParksCard({ parkCompanies }: { parkCompanies: ParkCompany[] }) {
	return (
		<section className="ShowParksCardContainer">
			{parkCompanies.map((company) =>
				company.parks.map((parkItem) => (
					<ParkCard key={parkItem.id} park={parkItem} />
				)),
			)}
		</section>
	);
}

export default ShowParksCard;
