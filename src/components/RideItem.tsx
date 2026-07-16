import type { RideItemProps } from "../types";
import { getWaitTimeClass } from "../utils/rideUtils";
import Done from "./Done";
import FavoriteButton from "./FavoriteButton";
import HiddenButton from "./HiddenButton";
import "../css/RideItem.css";

function RideItem({
	ride,
	index,
	variant = "open",
	hideCategory = false,
	favorites,
	onToggle,
	doneRideIds,
	toggleDone,
}: RideItemProps) {
	return (
		<li className={`ride-item ${variant === "closed" ? "closed" : ""}`}>
			<div className="ride-info">
				{index !== undefined && (
					<span className="ride-number">{index + 1}</span>
				)}
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

				{toggleDone && (
					<Done ride={ride} doneRideIds={doneRideIds ?? []} toggleDone={toggleDone} />
				)}
				<FavoriteButton item={ride} favorites={favorites} onToggle={onToggle} />
				<HiddenButton rideName={ride.name} />
			</div>
		</li>
	);
}

export default RideItem;
