import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import "./css/Reset.css";
import NavBar from "./components/NavBar.tsx";
import { useParkRides } from "./hooks/useParkRides.ts";
import Home from "./pages/Home.tsx";
import Park from "./pages/Park.tsx";
import type { Park as ParkType, Ride } from "./types.ts";

function App() {
	const [favoriteRideIds, setFavoriteRideIds] = useState<number[]>([]);
	const [favoriteParks, setFavoriteParks] = useState<ParkType[]>([]);
	const [currentParkId, setCurrentParkId] = useState<number | null>(null);
	const [doneRideIds, setDoneRideIds] = useState<number[]>([]);

	// on récupère les rides à jour du parc actuellement sélectionné
	const { rides: freshRides } = useParkRides(currentParkId ?? 0);

	// on reconstruit la liste des rides favorites à partir des ids + données fraîches
	const favoriteRides: Ride[] = freshRides.filter((ride) =>
		favoriteRideIds.includes(ride.id),
	);

	function addFavorite(ride: Ride) {
		const alreadyFavorite = favoriteRideIds.some((fav) => fav === ride.id);

		if (alreadyFavorite) {
			setFavoriteRideIds(favoriteRideIds.filter((fav) => fav !== ride.id));
		} else {
			setFavoriteRideIds([...favoriteRideIds, ride.id]);
		}
	}

	function addFavoritePark(park: ParkType) {
		const alreadyFavorite = favoriteParks.some((fav) => fav.id === park.id);

		if (alreadyFavorite) {
			setFavoriteParks(favoriteParks.filter((fav) => fav.id !== park.id));
		} else {
			setFavoriteParks([...favoriteParks, park]);
		}
	}

	function toggleDone(id: number) {
		if (doneRideIds.some((rideId) => rideId === id)) {
			setDoneRideIds(doneRideIds.filter((rideId) => rideId !== id));
		} else {
			setDoneRideIds([...doneRideIds, id]);
		}
	}

	return (
		<>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route
						path="/"
						element={
							<Home
								favoriteParks={favoriteParks}
								addFavoritePark={addFavoritePark}
							/>
						}
					/>
					<Route
						path="/park/:parkId"
						element={
							<Park
								addFavorite={addFavorite}
								favoriteRides={favoriteRides}
								setCurrentParkId={setCurrentParkId}
								doneRideIds={doneRideIds}
								toggleDone={toggleDone}
							/>
						}
					/>
					<Route path="*" element={<p>Page introuvable</p>} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
export default App;
