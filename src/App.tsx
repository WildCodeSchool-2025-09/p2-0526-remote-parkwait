import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./css/App.css";
import "./css/Reset.css";
import { useState } from "react";
import FavoriteList from "./components/FavoriteList.tsx";
import FavoriteParkList from "./components/FavoriteParkList.tsx";
import Home from "./pages/Home.tsx";
import Park from "./pages/Park.tsx";
import type { Park as ParkType, Ride } from "./types.ts";

function App() {
	const [favoriteRides, setFavoriteRides] = useState<Ride[]>([]);
	const [favoriteParks, setFavoriteParks] = useState<ParkType[]>([]);

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

	return (
		<>
			<BrowserRouter>
				<Link to="/favorites" className="favorites-link">
					Mes favoris
				</Link>
				<Link to="/favorite-parks" className="favorites-link">
					Mes parcs favoris
				</Link>
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
							<Park addFavorite={addFavorite} favoriteRides={favoriteRides} />
						}
					/>
					<Route
						path="/favorites"
						element={<FavoriteList favoriteRides={favoriteRides} />}
					/>
					<Route
						path="/favorite-parks"
						element={<FavoriteParkList favoriteParks={favoriteParks} />}
					/>
					<Route path="*" element={<p>Page introuvable</p>} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
export default App;
