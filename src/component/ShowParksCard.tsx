import "../css/ShowParksCard.css";

import type { ParkCompany } from "../types"

function ShowParksCard({ park }: { park: ParkCompany[] }) {
	return (
		<section className="ShowParksCardContainer">
			{park.map((company) =>
				company.parks.map((parkItem) => (
					<article key={parkItem.id} className="ParkCard">
						<p className="ParkCard-name">{parkItem.name}</p>
						<p className="ParkCard-country">{parkItem.country}</p>
					</article>
				)),
			)}
		</section>
	);
}

export default ShowParksCard;
