import { useState } from "react";
import "../css/ParkFilter.css";
import myIcon from "../../public/icons/world.svg";

function ParkFilter({ countries, selectedCountry, onFilterChange }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="filter-wrapper">
			<button
				type="button"
				className="filter-trigger"
				onClick={() => setIsOpen(!isOpen)}
			>
				<img src={myIcon} alt="world Icon" className="btn-icon" />
				Pays : {selectedCountry} {isOpen ? "▲" : "▼"}
			</button>

			{isOpen && (
				<ul className="filter-list">
					{countries.map((country) => (
						<li key={country}>
							<button
								type="button"
								className={selectedCountry === country ? "active" : ""}
								onClick={() => {
									onFilterChange(country);
									setIsOpen(false);
								}}
							>
								{country}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default ParkFilter;
