// App.tsx
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/NavBar.tsx";
import Home from "./pages/Home.tsx";
import Park from "./pages/Park.tsx";
import type { ParkCompany } from "./types";

const PARK_LIST_REFRESH_INTERVAL = 5 * 60 * 1000;

function App() {
	const [companies, setCompanies] = useState<ParkCompany[]>([]);

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
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home park={companies} />} />
				<Route path="/park" element={<Park />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
