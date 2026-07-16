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
	addFavorite,
	favoriteRides,
	doneRideIds,
	toggleDone,
	hiddenRideIds,
	toggleHidden,
}: RideItemProps) {
	return (
		<li className={`ride-item ${variant !== "open" ? variant : ""}`}>
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
				{variant === "closed" && <div className="ride-status">Closed</div>}
				{variant === "done" && (
					<>
						<div className="ride-status">Done</div>
						<Done
							ride={ride}
							doneRideIds={doneRideIds}
							toggleDone={toggleDone}
						/>
						<HiddenButton
							ride={ride}
							hiddenRideIds={hiddenRideIds}
							toggleHidden={toggleHidden}
						/>
					</>
				)}
				{variant === "hidden" && (
					<>
						<div className="ride-status">Hidden</div>
						<HiddenButton
							ride={ride}
							hiddenRideIds={hiddenRideIds}
							toggleHidden={toggleHidden}
						/>
					</>
				)}
				{variant === "open" && (
					<>
						<div
							className={`ride-wait-time ${getWaitTimeClass(ride.wait_time)}`}
						>
							{ride.wait_time} min
						</div>
						<Done
							ride={ride}
							doneRideIds={doneRideIds}
							toggleDone={toggleDone}
						/>
						<FavoriteButton
							ride={ride}
							addFavorite={addFavorite}
							favoriteRides={favoriteRides}
						/>
						<HiddenButton
							ride={ride}
							hiddenRideIds={hiddenRideIds}
							toggleHidden={toggleHidden}
						/>
					</>
				)}
			</div>
		</li>
	);
}

export default RideItem;
