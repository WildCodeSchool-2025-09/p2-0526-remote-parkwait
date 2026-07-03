import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./css/App.css";
import "./css/Reset.css";
import { useState } from "react";
import FavoriteList from "./components/FavoriteList.tsx";
import Home from "./pages/Home.tsx";
import Park from "./pages/Park.tsx";
import type { Ride } from "./types.ts";

function App() {
	const [favoriteRides, setFavoriteRides] = useState<Ride[]>([]);

	function addFavorite(ride: Ride) {
		const alreadyFavorite = favoriteRides.some((fav) => fav.id === ride.id);

		if (alreadyFavorite) {
			setFavoriteRides(favoriteRides.filter((fav) => fav.id !== ride.id));
		} else {
			setFavoriteRides([...favoriteRides, ride]);
		}
	}

	return (
		<>
			<BrowserRouter>
				<Link to="/favorites" className="favorites-link">
					Mes favoris
				</Link>
				<Routes>
					<Route path="/" element={<Home />} />
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
					<Route path="*" element={<p>Page introuvable</p>} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
export default App;
