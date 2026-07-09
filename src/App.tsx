// App.tsx
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar.tsx";
import Home from "./pages/Home.tsx";
import Park from "./pages/Park.tsx";
import type { ParkGroup } from "./types";

const PARK_LIST_REFRESH_INTERVAL = 5 * 60 * 1000;

function App() {
	const [companies, setCompanies] = useState<ParkGroup[]>([]);

	useEffect(() => {
		function fetchParks() {
			fetch("/api/parks.json")
				.then((response) => response.json())
				.then((data) => {
					setCompanies(data);
				});
		}
		fetchParks();
		const interval = setInterval(() => {
			fetchParks();
		}, PARK_LIST_REFRESH_INTERVAL);
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/park/:parkId" element={<Park />} />
					<Route path="*" element={<p>Page introuvable</p>} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
export default App;
