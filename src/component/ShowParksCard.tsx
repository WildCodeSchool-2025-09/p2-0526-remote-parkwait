import "../css/ShowParksCard.css";

export interface Park {
	id: number;
	name: string;
	country: string;
	continent: string;
	latitude: number;
	longitude: number;
	timezone: string;
}

export interface ParkCompany {
	id: number;
	name: string;
	parks: Park[];
}

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
