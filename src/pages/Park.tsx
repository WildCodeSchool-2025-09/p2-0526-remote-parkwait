import { useParams } from "react-router-dom";
import ParkHeader from "../components/ParkHeader";
import { useParkSummary } from "../hooks/useParkSummary";

function Park() {
	const { parkId } = useParams();
	const summary = useParkSummary(parkId);

	if (summary === null) {
		return <p>Chargement...</p>;
	}

	return <ParkHeader summary={summary} />;
}

export default Park;
