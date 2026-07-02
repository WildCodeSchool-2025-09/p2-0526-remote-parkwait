import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import "./css/Reset.css";
import FavoriteButton from "./components/FavoriteButton.tsx";
import Home from "./pages/Home.tsx";
import Park from "./pages/Park.tsx";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/park" element={<Park />} />
					<Route path="/favorite" element={<FavoriteButton />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
