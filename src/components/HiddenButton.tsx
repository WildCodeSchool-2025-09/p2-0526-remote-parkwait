import EyeIcon from "../asset/img/icons/eye.svg";
import EyeOffIcon from "../asset/img/icons/eyeoff.svg";
import type { HiddenButtonProps } from "../types";

function HiddenButton({
	ride,
	hiddenRideIds,
	toggleHidden,
}: HiddenButtonProps) {
	const isHidden = hiddenRideIds.some((rideId) => rideId === ride.id);
	function handleClick() {
		toggleHidden(ride.id);
	}

	return (
		<button
			type="button"
			className={`icon-button hidden-button${isHidden ? " is-active" : ""}`}
			onClick={handleClick}
			aria-label={isHidden ? `Show ${ride.name}` : `Hide ${ride.name}`}
			aria-pressed={isHidden}
			title="Hide/Show"
		>
			<img src={isHidden ? EyeIcon : EyeOffIcon} className="hideIcon" alt="" />
		</button>
	);
}

export default HiddenButton;
