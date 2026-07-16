import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import "./css/Reset.css";
import NavBar from "./components/NavBar.tsx";
import { useParkRides } from "./hooks/useParkRides.ts";
import FavoriteList from "./pages/FavoriteList.tsx";
import Home from "./pages/Home.tsx";
import Park from "./pages/Park.tsx";
import type { Park as ParkType, Ride } from "./types.ts";
import { byWaitTime } from "./utils/rideUtils.ts";

function App() {
	const [favoriteRides, setFavoriteRides] = useState<Ride[]>([]);
	const [favoriteParks, setFavoriteParks] = useState<ParkType[]>([]);
	const [currentParkId, setCurrentParkId] = useState<number | null>(null);
	const [doneRideIds, setDoneRideIds] = useState<number[]>([]);

	// on récupère les rides à jour du parc actuellement sélectionné
	const { rides: freshRides } = useParkRides(currentParkId ?? 0);

	// on rafraîchit les favoris du parc actuellement affiché avec les données à jour
	// (wait_time notamment) ; les favoris des autres parcs gardent leur dernier snapshot connu
	const favoriteRidesWithFreshData: Ride[] = favoriteRides
		.map((fav) => freshRides.find((ride) => ride.id === fav.id) ?? fav)
		.sort(byWaitTime);

	function addFavorite(ride: Ride) {
		const alreadyFavorite = favoriteRides.some((fav) => fav.id === ride.id);

		if (alreadyFavorite) {
			setFavoriteRides(favoriteRides.filter((fav) => fav.id !== ride.id));
		} else {
			setFavoriteRides([...favoriteRides, ride]);
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
						path="/park/:id"
						element={
							<Park
								addFavorite={addFavorite}
								favoriteRides={favoriteRidesWithFreshData}
								setCurrentParkId={setCurrentParkId}
								doneRideIds={doneRideIds}
								toggleDone={toggleDone}
							/>
						}
					/>
					<Route
						path="/favorites"
						element={
							<FavoriteList
								title="FAVORIS"
								items={favoriteRidesWithFreshData}
								emptyMessage="Vous n'avez pas encore ajouté de favoris. Cliquez sur le cœur d'une attraction pour l'ajouter ici."
								isOpen={(ride) => ride.is_open}
								renderStatus={(ride) => `${ride.wait_time} min d'attente`}
							/>
						}
					/>
					<Route
						path="/favorite-parks"
						element={
							<FavoriteList
								title="PARCS FAVORIS"
								items={favoriteParks}
								emptyMessage="Vous n'avez pas encore ajouté de parc en favoris. Cliquez sur le cœur d'un parc pour l'ajouter ici."
								renderStatus={(park) => park.country}
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
