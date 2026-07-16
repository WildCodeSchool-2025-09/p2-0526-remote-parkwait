import { useState } from "react";
import cancelIcon from "../asset/img/icons/cancel.svg";
import checkCircleIcon from "../asset/img/icons/checkcircle.svg";
import WeatherBadge from "./WeatherBadge";
import type { ParkSummary } from "../types";

interface ParkHeaderProps {
	summary: ParkSummary;
}

function ParkHeader({ summary }: ParkHeaderProps) {
	const [imgSrc, setImgSrc] = useState(`/icons/parks/${summary.id}.webp`);
	const [triedFallback, setTriedFallback] = useState(false);

	function handleImageError() {
		if (!triedFallback) {
			setImgSrc("/icons/parks/default.webp");
			setTriedFallback(true);
		}
	}

	return (
		<header className="park-header">
			<div className="park-header-image-wrapper">
				<img
					src={imgSrc}
					alt=""
					className="park-header-image"
					onError={handleImageError}
				/>
			</div>
			<p className="label">Selected park</p>
			<h2 className="title">{summary.name}</h2>
			<div className="badges">
				<span
					className={`badge ${summary.isOpen ? "badge-open" : "badge-closed"}`}
				>
					<img
						src={summary.isOpen ? checkCircleIcon : cancelIcon}
						alt=""
						width="16"
					/>
					{summary.isOpen ? `Open until ${summary.closingTime}` : "Closed"}
				</span>
				<WeatherBadge lat={summary.latitude} lng={summary.longitude} />
			</div>
		</header>
	);
}

export default ParkHeader;