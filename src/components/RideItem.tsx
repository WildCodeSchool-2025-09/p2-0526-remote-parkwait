import EyeOffIcon from "../asset/img/icons/eyeoff.svg";
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
	favorites,
	onToggle,
	onToggleHidden,
}: RideItemProps) {
	return (
		<li
			className={`ride-item ${variant === "closed" ? "closed" : ""} ${variant === "hidden" ? "hidden" : ""}`}
		>
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
				{ride.is_open ? (
					<div className={`ride-wait-time ${getWaitTimeClass(ride.wait_time)}`}>
						{ride.wait_time} min
					</div>
				) : (
					<div className="ride-status">Fermé</div>
				)}

				<FavoriteButton item={ride} favorites={favorites} onToggle={onToggle} />

				{variant === "hidden" ? (
					<button
						type="button"
						className="icon-button hidden-button is-active"
						onClick={() => onToggleHidden(ride)}
						aria-label={`Afficher ${ride.name}`}
						title="Annuler"
					>
						<img src={EyeOffIcon} className="hideIcon" alt="" />
					</button>
				) : (
					<HiddenButton
						rideName={ride.name}
						onHide={() => onToggleHidden(ride)}
					/>
				)}
			</div>
		</li>
	);
}

export default RideItem;
