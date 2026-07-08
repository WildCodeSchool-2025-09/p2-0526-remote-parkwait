import { useParams } from "react-router-dom";
import ParkHeader from "../components/ParkHeader";
import RideList from "../components/RideList";
import { useParkSummary } from "../hooks/useParkSummary";

function Park() {
	const { id } = useParams<{ id: string }>();
	const summary = useParkSummary(id);

	if (summary === null) {
		return <p>Chargement...</p>;
	}

	return (
		<>
			<ParkHeader summary={summary} />
			<div className="park-page">
				{id ? <RideList parkId={id} /> : <p>Parc introuvable.</p>}
			</div>
		</>
	);
}

export default Park;
