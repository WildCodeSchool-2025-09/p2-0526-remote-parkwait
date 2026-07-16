import { useLandSection } from "../hooks/useLandSection";
import type { LandSectionProps } from "../types";
import { getLandIcon } from "../utils/rideUtils";
import RideItem from "./RideItem";
import "../css/LandSection.css";

function LandSection({
	land,
	addFavorite,
	favoriteRides,
	doneRideIds,
	toggleDone,
	hiddenRideIds,
	toggleHidden,
}: LandSectionProps) {
	const { isOpen, toggle } = useLandSection();

	return (
		<section className="land-section">
			<button
				type="button"
				className="land-header"
				onClick={toggle}
				aria-expanded={isOpen}
			>
				<div className="land-title">
					<img src={getLandIcon(land.name)} alt="" className="land-icon" />
					<span className="land-name">{land.name}</span>
					<span className="land-count">{land.rides.length} attractions</span>
				</div>
				<span className={`chevron ${isOpen ? "open" : ""}`}>▾</span>
			</button>

			{isOpen && (
				<ul className="ride-list">
					{land.rides.map((ride, index) => (
						<RideItem
							key={ride.id}
							ride={ride}
							index={index + 1}
							hideCategory
							addFavorite={addFavorite}
							favoriteRides={favoriteRides}
							doneRideIds={doneRideIds}
							toggleDone={toggleDone}
							hiddenRideIds={hiddenRideIds}
							toggleHidden={toggleHidden}
						/>
					))}
				</ul>
			)}
		</section>
	);
}

export default LandSection;
