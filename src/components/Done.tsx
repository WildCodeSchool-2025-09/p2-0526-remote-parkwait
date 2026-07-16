import type { Ride } from "../types";

function Done({
	ride,
	toggleDone,
	doneRideIds,
}: {
	ride: Ride;
	doneRideIds: number[];
	toggleDone: (id: number) => void;
}) {
	const isDone = doneRideIds.some((rideId) => rideId === ride.id);
	function handleClick() {
		toggleDone(ride.id);
	}
	return (
		<button
			type="button"
			className={`icon-button done-button${isDone ? " is-active" : ""}`}
			onClick={handleClick}
			aria-label={
				isDone
					? `Mark ${ride.name} as not done`
					: `Mark ${ride.name} as done`
			}
			aria-pressed={isDone}
			title="Done"
		>
			<img
				src={isDone ? "/icons/check.png" : "/icons/check-mark.png"}
				className="doneIcon"
				alt=""
			/>
		</button>
	);
}

export default Done;
