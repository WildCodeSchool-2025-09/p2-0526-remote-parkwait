import type { RideItemProps } from "../types";
import { getWaitTimeClass } from "../utils/rideUtils";
import FavoriteButton from "./FavoriteButton";
import HiddenButton from "./HiddenButton";
import "../css/RideItem.css";

function RideItem({
	ride,
	index,
	variant = "open",
	hideCategory = false,
	addFavorite,
	favoriteRides,
}: RideItemProps) {
	return (
		<li className={`ride-item ${variant === "closed" ? "closed" : ""}`}>
			<div className="ride-info">
				{index !== undefined && <span className="ride-number">{index}</span>}
				<div className="ride-text">
					<h3>{ride.name}</h3>
					{!hideCategory && (
						<span className="ride-category">{ride.category}</span>
					)}
				</div>
			</div>

			<div className="ride-actions">
				{variant === "closed" ? (
					<div className="ride-status">Fermé</div>
				) : (
					<div className={`ride-wait-time ${getWaitTimeClass(ride.wait_time)}`}>
						{ride.wait_time} min
					</div>
				)}
				<FavoriteButton
					ride={ride}
					addFavorite={addFavorite}
					favoriteRides={favoriteRides}
				/>
				<HiddenButton rideName={ride.name} />
			</div>
		</li>
	);
}

export default RideItem;
