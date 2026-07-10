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

function App() {
	const [favoriteRideIds, setFavoriteRideIds] = useState<number[]>([]);
	const [favoriteParks, setFavoriteParks] = useState<ParkType[]>([]);
	const [currentParkId, setCurrentParkId] = useState<number | null>(null);

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
								favoriteRides={favoriteRides}
								setCurrentParkId={setCurrentParkId}
							/>
						}
					/>
					<Route
						path="/favorites"
						element={
							<FavoriteList
								title="FAVORIS"
								items={favoriteRides}
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
