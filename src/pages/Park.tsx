import { useParams } from "react-router-dom";
import RideList from "../components/RideList";

function Park() {
	const { id } = useParams<{ id: string }>();
	const parkId = Number(id);

	return (
		<div className="park-page">
			{parkId ? <RideList parkId={parkId} /> : <p>Parc introuvable.</p>}
		</div>
	);
}

export default Park;
